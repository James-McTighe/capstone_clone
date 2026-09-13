from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import logging

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/api/uploadfile")
async def raw_data_input(file: UploadFile = File(...)):
    if file.filename == "":
        raise HTTPException(status_code=400, detail="Empty filename")

    logger.info(f"Upload received: filename={file.filename}, content_type={file.content_type}")

    return JSONResponse(
        status_code=200,
        content={
            "message": "File received",
            "filename": file.filename
        }
    )
