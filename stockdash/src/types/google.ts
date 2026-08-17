export interface GooglePredictionResponse {
  ticker: string;
  last_known_date: string;
  last_known_price: number;
  prediction_target_date: string;
  predicted_price: number;
  lookback_days: number;
  horizon_days: number;
}