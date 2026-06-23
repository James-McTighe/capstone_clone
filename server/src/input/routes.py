import logging

from flask import Blueprint, jsonify, request, current_app

input_bp = Blueprint("input", __name__)


@input_bp.route("/api/uploadfile", methods=["POST"])
def raw_data_input():
    file = request.files.get("myFile")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    current_app.logger.info("Upload received: filename=%s content_type=%s", file.filename, file.content_type)

    return jsonify({
        "message": "File received",
        "filename": file.filename
    }), 200
