
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
from tensorflow.keras.models import load_model
from datetime import timedelta

app = FastAPI(title="Google Stock LSTM Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

MODEL_PATH = "export/google_lstm_model.keras"
SCALER_PATH = "export/price_scaler.pkl"
CSV_PATH = "../../../Yahoo_Finance/Google/GOOG_historical_stock.csv"

LOOKBACK = 3
HORIZON = 30

model = load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


def get_latest_window():
    df = pd.read_csv(CSV_PATH)
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.sort_values('Date').reset_index(drop=True)

    if len(df) < LOOKBACK:
        raise HTTPException(
            status_code=500, detail="Not enough data to predict")

    last_prices = df['Close'].values[-LOOKBACK:].reshape(-1, 1)
    last_date = df['Date'].max()
    last_known_price = float(df['Close'].values[-1])
    return last_prices, last_date, last_known_price


@app.get("/predict")
def predict():
    last_prices, last_date, last_known_price = get_latest_window()


    scaled_window = scaler.transform(last_prices)
    X = scaled_window.reshape((1, LOOKBACK, 1))

    pred_scaled = model.predict(X, verbose=0)
    pred_price = float(scaler.inverse_transform(pred_scaled)[0][0])

    target_date = last_date + timedelta(days=HORIZON)

    return {
        "ticker": "GOOGL",
        "last_known_date": last_date.strftime("%Y-%m-%d"),
        "last_known_price": round(last_known_price, 2),
        "prediction_target_date": target_date.strftime("%Y-%m-%d"),
        "predicted_price": round(pred_price, 2),
        "lookback_days": LOOKBACK,
        "horizon_days": HORIZON,
    }


@app.get("/health")
def health():
    return {"status": "ok"}
