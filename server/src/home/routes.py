from flask import Blueprint, jsonify
import json
from pathlib import Path

main = Blueprint("main", __name__)

@main.route('/api/data/home', methods=["GET"])
def get_home_data():
    HOME_DATA_PATH = Path(__file__).with_name('home-content.json')
    with HOME_DATA_PATH.open('r', encoding='utf-8') as file:
        data = json.load(file)
    return jsonify(data)
