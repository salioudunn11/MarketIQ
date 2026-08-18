import { GooglePredictionResponse } from '../types/google';

const API_BASE_URL = 'http://localhost:8000';

export const getGooglePrediction = async (): Promise<GooglePredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: GooglePredictionResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch prediction from FastAPI:', error);
    throw error;
  }
};