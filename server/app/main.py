from pathlib import Path
from tempfile import TemporaryDirectory

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.parsing.parsing_data import process_manual
from app.parsing.process_preprocessed_data import (
    add_loading_data_preprocessed,
    normalize_preprocessed_conditions,
    process_preprocessed_data,
)

app = FastAPI(
    title="Kinetics App",
    version="1.0.0",
    description="Application for analyzing chemstation data for kinetics experiments."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Receives the React upload and preserves the source type for later processing.
@app.post("/api/uploadfile")
async def upload_file(
    file: UploadFile = File(..., alias="myFile"),
    conditions_file: UploadFile = File(..., alias="conditionsFile"),
    source: str = "hplc",
):
    if source not in {"hplc", "preprocessed"}:
        raise HTTPException(status_code=400, detail="Invalid source type")

    if not file.filename or not conditions_file.filename:
        raise HTTPException(status_code=400, detail="Data and conditions files are required")

    data_extension = Path(file.filename).suffix.lower()
    conditions_extension = Path(conditions_file.filename).suffix.lower()
    allowed_data = {"hplc": {".xlsx", ".xls"}, "preprocessed": {".csv", ".xlsx", ".xls"}}
    if data_extension not in allowed_data[source]:
        raise HTTPException(status_code=400, detail="Unsupported data file type")
    if conditions_extension not in {".csv", ".xlsx", ".xls", ".xlsm"}:
        raise HTTPException(status_code=400, detail="Unsupported conditions file type")

    try:
        with TemporaryDirectory() as directory:
            data_path = Path(directory) / Path(file.filename).name
            conditions_path = Path(directory) / Path(conditions_file.filename).name
            data_path.write_bytes(await file.read())
            conditions_path.write_bytes(await conditions_file.read())

            if source == "hplc":
                processed = process_manual(conditions_path, data_path, save_as_csv=False)
            else:
                conditions = normalize_preprocessed_conditions(conditions_path)
                processed = process_preprocessed_data(data_path, conditions)
                processed = add_loading_data_preprocessed(processed, conditions)

            return {
                "message": "Files processed successfully",
                "filename": file.filename,
                "conditions_filename": conditions_file.filename,
                "source": source,
                "rows": len(processed.index),
                "columns": [str(column) for column in processed.columns],
            }
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail="Unable to process uploaded files") from error


