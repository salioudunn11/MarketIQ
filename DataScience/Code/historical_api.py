# from fastapi import FastAPI
# import requests
# import joblib
# import os

# app = FastAPI()

# FMP_KEY = os.environ["FMP_API_KEY"]
# model = joblib.load("google_lstm_model.keras")
# scaler = joblib.load("price_scaler.pkl")

# @app.get("/predict/{ticker}")
# def predict(ticker: str):

#     prediction = predict_one(ticker, model, scaler)
#     return prediction