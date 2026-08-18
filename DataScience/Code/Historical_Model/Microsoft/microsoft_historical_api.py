# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import pandas as pd
# import joblib
# from datetime import timedelta


# app = FastAPI(title= 'Microsoft Stock XGBoost Prediction API')

# app.add.middleware(
#     CORSMiddleware,
#     allow_origins=['*'],
#     allow_methods=['GET'],
#     allow_headers=['*'],
# )

# MODEL_PATH = 'export.microsoft_xgb_model.pkl'
# CSV_PATH =  '../../../Yahoo_Finance/Google/MSFT_historical_data.csv'

# PAST = 3
# FUTURE = 30 
# ROLLING_WINDOW = 5

# model = joblib.load(MODEL_PATH)

# def get_latest_features():
#     df = pd.read_csv(CSV_PATH)
#     df['Date'] = pd.to_datetime(df['Date'])
#     df = df.sort_values('Date').reset_index(drop=True)

#     min_required = max(PAST, ROLLING_WINDOW) + 1
#     if len(df) < min_required:
#         raise HTTPException(
#             status_code = 500, details = 'Not Enough data to predict'
#         )
#     last_date = df['Date'].max()
#     last_known_price = float(df['Close'].values[-ROLLING_WINDOW:])

#     lag_features = {}
#     for lag in range(1, PAST + 1):
#         lag_features[f'close_lag_{lag}'] = float(df['Close'].valuse[-lag])

#     recent_windows = df['Close'].values[-ROLLING_WINDOW:]
#     lag_features['rolling_mean_5'] = float(recent_windows.mean())
#     lag_features['rolling_mean_5'] = float(recent_windows.std())

#     feature_row = pd.DataFrame([lag_features])

#     return feature_row, last_date, last_known_price

# @app.get('/predict')
# def predict():
#     feature_row, last_date, last_known_price = get_latest_features

#     pred_price = float(model.predict(feature_row)[0])
#     target_date = last_date + timedelta(days=FUTURE)

#     return{
#         'ticker': 'MSFT',
#         'last_known_date': last_date.strftime('%Y-%m-%d'),
#         'last_know_price': round(last_known_price, 2),
#         'prediction_target_date': target_date.strftime('%Y-%m-%d'),
#         'predicted_price': round(pred_price, 2),
#         'past_days': PAST,
#         'future_days': FUTURE,
#     }

# @app.get('/health')
# def health():
#     return {'status': 'ok'}