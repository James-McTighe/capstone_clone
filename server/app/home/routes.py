from fastapi import APIRouter
import json
from pathlib import Path
import plotly.express as px
import plotly.io as pio
import pandas as pd
import numpy as np

main_router = APIRouter(prefix="/api/", tags=["Authentication"])

@main_router.get('/home')
def get_home_data():
    HOME_DATA_PATH = Path(__file__).with_name('home-content.json')
    with HOME_DATA_PATH.open('r', encoding='utf-8') as file:
        data = json.load(file)
    return jsonify(data)

@main_router.get('/api/chart-data')
def get_chart_data():
    np.random.seed(42)
    times = pd.date_range(start="2026-01-01", periods=100, freq="h")
    signals = np.sin(np.linspace(0,10,100)) + np.random.normal(0, 0.1, 100)

    df = pd.DataFrame({"Time": times, "Signal": signals})

    fig = px.line(
        df,
        x="Time",
        y="Signal",
        title="Real-time Signal Analytics",
        labels={"Signal": "Amplitude (mV)", "Time": "Timestamp"}
    )

    fig.update_layout(
        template="plotly_white",
        margin=dict(l=40, r=40, t=40, b=40)
    )

    graph_json = pio.to_json(fig)

    return graph_json, 200, {"Content-Type": "application/json"}
