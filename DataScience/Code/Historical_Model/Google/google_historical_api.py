# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import pandas as pd
# import joblib
# from datetime import timedelta

# app = FastAPI(title="Google Stock XGBoost Prediction API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["GET"],
#     allow_headers=["*"],
# )

# MODEL_PATH = "export/google_xgb_model.pkl"
# CSV_PATH = "../../../Yahoo_Finance/Google/GOOG_historical_stock.csv"

# LOOKBACK = 3
# HORIZON = 30
# ROLLING_WINDOW = 5

# model = joblib.load(MODEL_PATH)


# def get_latest_features():
#     df = pd.read_csv(CSV_PATH)
#     df['Date'] = pd.to_datetime(df['Date'])
#     df = df.sort_values('Date').reset_index(drop=True)

#     min_required = max(LOOKBACK, ROLLING_WINDOW) + 1
#     if len(df) < min_required:
#         raise HTTPException(
#             status_code=500, detail="Not enough data to predict")

#     last_date = df['Date'].max()
#     last_known_price = float(df['Close'].values[-1])

<< << << < HEAD
#     # Rebuild the same features the model was trained on.
#     # close_lag_1 = most recent close, close_lag_2 = one before that, etc.
#     lag_features = {}
#     for lag in range(1, LOOKBACK + 1):
#         lag_features[f'close_lag_{lag}'] = float(df['Close'].values[-lag])
== == == =
lag_features = {}
for lag in range(1, LOOKBACK + 1):
    lag_features[f'close_lag_{lag}'] = float(df['Close'].values[-lag])
>>>>>> > origin/main

#     recent_window = df['Close'].values[-ROLLING_WINDOW:]
#     lag_features['rolling_mean_5'] = float(recent_window.mean())
#     lag_features['rolling_std_5'] = float(recent_window.std())

#     feature_row = pd.DataFrame([lag_features])

#     return feature_row, last_date, last_known_price


# @app.get("/predict")
# def predict():
#     feature_row, last_date, last_known_price = get_latest_features()

#     pred_price = float(model.predict(feature_row)[0])

#     target_date = last_date + timedelta(days=HORIZON)

#     return {
#         "ticker": "GOOGL",
#         "last_known_date": last_date.strftime("%Y-%m-%d"),
#         "last_known_price": round(last_known_price, 2),
#         "prediction_target_date": target_date.strftime("%Y-%m-%d"),
#         "predicted_price": round(pred_price, 2),
#         "lookback_days": LOOKBACK,
#         "horizon_days": HORIZON,
#     }


# @app.get("/health")
# def health():
#     return {"status": "ok"}
