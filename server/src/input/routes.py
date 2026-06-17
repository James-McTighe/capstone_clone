from flask import Blueprint, jsonify
import json
from pathlib import Path
import plotly.express as px
import plotly.io as pio
import pandas as pd
import numpy as np

input = Blueprint("input", __name__)

@input.route("/api/uploadfile", methods=["GET", "POST"])
def raw_data_input():
    pass
