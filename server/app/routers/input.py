import logging

from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/input", tags=["uploads"])


@router.post("/uploadfile")
async def raw_data_input(file: UploadFile = File(...)):
    if file.filename == "":
        raise HTTPException(status_code=400, detail="Empty filename")

    logger.info(
        f"Upload received: filename={file.filename}, content_type={file.content_type}"
    )

    return JSONResponse(
        status_code=200, content={"message": "File received", "filename": file.filename}
    )
