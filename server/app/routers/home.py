import json
from pathlib import Path

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.io as pio
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/home", tags=["Authentication"])


@router.get("/")
def get_home_data():
    HOME_DATA_PATH = Path(__file__).with_name("home-content.json")
    with HOME_DATA_PATH.open("r", encoding="utf-8") as file:
        data = json.load(file)
    return JSONResponse(status_code=200, content=data)


@router.get("/chart-data")
def get_chart_data():
    np.random.seed(42)
    times = pd.date_range(start="2026-01-01", periods=100, freq="h")
    signals = np.sin(np.linspace(0, 10, 100)) + np.random.normal(0, 0.1, 100)

    df = pd.DataFrame({"Time": times, "Signal": signals})

    fig = px.line(
        df,
        x="Time",
        y="Signal",
        title="Real-time Signal Analytics",
        labels={"Signal": "Amplitude (mV)", "Time": "Timestamp"},
    )

    fig.update_layout(
        template="plotly_white", margin={"l": 40, "r": 40, "t": 40, "b": 40}
    )

    graph_json = pio.to_json(fig)

    return graph_json, 200, {"Content-Type": "application/json"}
