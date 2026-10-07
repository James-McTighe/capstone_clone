import logging

from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/input", tags=["uploads"])


@router.post("/uploadfile")
async def raw_data_input(
    file: UploadFile = File(...),
    source: str = Form(...),
    conditions_file: UploadFile | None = File(None, alias="conditionsFile"),
):
    if source not in {"preprocessed", "hplc"}:
        raise HTTPException(status_code=400, detail="Invalid source type")

    if not file.filename:
        raise HTTPException(status_code=400, detail="Please upload a datafile")

    data_extension = Path(file.filename).suffix.lower()
    allowed_data_extensions = (
        {".xlsx", ".xls"} if source == "hplc" else {".csv", ".xlsx", ".xls"}
    )
    if data_extension not in allowed_data_extensions:
        raise HTTPException(status_code=400, detail="Unsupported data file type")

    if source == "hplc" and (conditions_file is None or not conditions_file.filename):
        raise HTTPException(status_code=400, detail="A conditions file is required for HPLC data")

    if conditions_file and Path(conditions_file.filename).suffix.lower() not in {
        ".csv", ".xlsx", ".xls", ".xlsm"
    }:
        raise HTTPException(status_code=400, detail="Unsupported conditions file type")

    logger.info(
        "Upload received: "
        f"filename={file.filename}, source={source}, "
        f"conditions_filename={conditions_file.filename if conditions_file else None}"
    )

    return JSONResponse(
        status_code=200,
        content={
            "message": "Files received successfully",
            "filename": file.filename,
            "source": source,
        },
    )
