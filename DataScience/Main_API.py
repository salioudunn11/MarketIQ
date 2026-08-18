from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
import joblib
import json
from pathlib import Path
from datetime import timedelta, datetime

app = FastAPI(title="Stock Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


BASE_DIR = Path(__file__).resolve().parent

LOOKBACK = 3
HORIZON = 30
ROLLING_WINDOW = 5


TICKERS = {
    "GOOGL": {
        "model_path": BASE_DIR / "Code" / "Historical_Model" / "Google" / "export" / "google_xgb_model.pkl",
        "csv_path": BASE_DIR / "Yahoo_Finance" / "Google" / "GOOG_historical_stock.csv",
        "use_rolling_features": True,
    },
    "AAPL": {
        "model_path": BASE_DIR / "Code" / "Historical_Model" / "Apple" / "export" / "apple_xgb_model.pkl",
        "csv_path": BASE_DIR / "Yahoo_Finance" / "Apple" / "AAPL_historical_stock.csv",
        "use_rolling_features": False,
    },
    "MSFT": {
        "model_path": BASE_DIR / "Code" / "Historical_Model" / "Microsoft" / "export" / "microsoft_xgb_model.pkl",
        "csv_path": BASE_DIR / "Yahoo_Finance" / "Microsoft" / "MSFT_historical_data.csv",
        "use_rolling_features": False,
    },
}

_models = {ticker: joblib.load(cfg["model_path"])
           for ticker, cfg in TICKERS.items()}


def get_latest_features(ticker: str):
    cfg = TICKERS[ticker]
    df = pd.read_csv(cfg["csv_path"])
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.sort_values("Date").reset_index(drop=True)

    min_required = max(LOOKBACK, ROLLING_WINDOW) + 1
    if len(df) < min_required:
        raise HTTPException(
            status_code=500, detail=f"Not enough data to predict for {ticker}")

    last_date = df["Date"].max()
    last_known_price = float(df["Close"].values[-1])

    lag_features = {}
    for lag in range(1, LOOKBACK + 1):
        lag_features[f"close_lag_{lag}"] = float(df["Close"].values[-lag])

    if cfg["use_rolling_features"]:
        recent_window = df["Close"].values[-ROLLING_WINDOW:]
        lag_features["rolling_mean_5"] = float(recent_window.mean())
        lag_features["rolling_std_5"] = float(recent_window.std())

    feature_row = pd.DataFrame([lag_features])
    return feature_row, last_date, last_known_price


@app.get("/predict/{ticker}")
def predict(ticker: str):
    ticker = ticker.upper()
    if ticker not in TICKERS:
        raise HTTPException(
            status_code=404, detail=f"Unknown ticker '{ticker}'. Valid: {list(TICKERS.keys())}")

    feature_row, last_date, last_known_price = get_latest_features(ticker)
    model = _models[ticker]
    pred_price = float(model.predict(feature_row)[0])
    target_date = last_date + timedelta(days=HORIZON)

    return {
        "ticker": ticker,
        "last_known_date": last_date.strftime("%Y-%m-%d"),
        "last_known_price": round(last_known_price, 2),
        "prediction_target_date": target_date.strftime("%Y-%m-%d"),
        "predicted_price": round(pred_price, 2),
        "lookback_days": LOOKBACK,
        "horizon_days": HORIZON,
    }


@app.get("/predict")
def predict_all():
    return [predict(ticker) for ticker in TICKERS]


ECON_TICKERS = ["AAPL", "MSFT", "GOOGL"]
SIM_DAYS = 30


ECON_EXPORT_DIR = BASE_DIR / "export"

_econ_models = {}
_econ_features = {}
_econ_starting_state = {}

for t in ECON_TICKERS:
    _econ_models[t] = joblib.load(ECON_EXPORT_DIR / f"{t}_econ_model.pkl")
    with open(ECON_EXPORT_DIR / f"{t}_econ_features.json") as f:
        _econ_features[t] = json.load(f)
    with open(ECON_EXPORT_DIR / f"{t}_econ_starting_state.json") as f:
        _econ_starting_state[t] = json.load(f)


class EconomicScenario(BaseModel):
    interest_rate: float = Field(..., description="e.g. 5.25 for 5.25%")
    inflation_rate: float = Field(..., description="e.g. 3.1 for 3.1%")
    unemployment_rate: float = Field(..., description="e.g. 4.0 for 4.0%")
    gdp_growth: float = Field(..., description="e.g. 2.5 for 2.5%")


def simulate_ticker(ticker: str, scenario: EconomicScenario):
    state = _econ_starting_state[ticker]
    model = _econ_models[ticker]
    feature_cols = _econ_features[ticker]

    close_lag_1 = state["close_lag_1"]
    close_lag_2 = state["close_lag_2"]
    close_lag_3 = state["close_lag_3"]
    recent_closes = list(state["recent_closes"])
    current_price = state["last_price"]
    current_date = datetime.strptime(state["last_date"], "%Y-%m-%d")

    path = []
    for day in range(1, SIM_DAYS + 1):
        row = {
            "close_lag_1": close_lag_1,
            "close_lag_2": close_lag_2,
            "close_lag_3": close_lag_3,
            "rolling_mean_5": sum(recent_closes) / len(recent_closes),
            "rolling_std_5": pd.Series(recent_closes).std(),
            "interest_rate": scenario.interest_rate,
            "inflation_rate": scenario.inflation_rate,
            "unemployment_rate": scenario.unemployment_rate,
            "gdp_growth": scenario.gdp_growth,
        }
        feature_row = pd.DataFrame([row])[feature_cols]

        predicted_return = float(model.predict(feature_row)[0])
        next_price = current_price * (1 + predicted_return)
        current_date = current_date + timedelta(days=1)

        path.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "predicted_price": round(next_price, 2),
        })

        close_lag_3 = close_lag_2
        close_lag_2 = close_lag_1
        close_lag_1 = next_price
        recent_closes = recent_closes[1:] + [next_price]
        current_price = next_price

    return path


@app.post("/predict/scenario")
def predict_scenario(scenario: EconomicScenario):
    """Returns a 30-day predicted price path for all 3 tickers under
    the given hypothetical economic conditions -- shaped for a
    multi-line chart with one series per ticker."""
    series = {ticker: simulate_ticker(ticker, scenario)
              for ticker in ECON_TICKERS}

    return {
        "scenario": scenario.dict(),
        "horizon_days": SIM_DAYS,
        "series": series,
        "chart_data": [
            {
                "date": series["AAPL"][i]["date"],
                "AAPL": series["AAPL"][i]["predicted_price"],
                "MSFT": series["MSFT"][i]["predicted_price"],
                "GOOGL": series["GOOGL"][i]["predicted_price"],
            }
            for i in range(SIM_DAYS)
        ],
    }


@app.get("/health")
def health():
    return {"status": "ok"}
