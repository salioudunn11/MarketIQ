import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';
import { useParams, useLocation } from 'react-router-dom';

// Define the shape of the data coming from your FastAPI backend
interface PredictionResponse {
  ticker: string;
  last_known_date: string;
  last_known_price: number;
  prediction_target_date: string;
  predicted_price: number;
  lookback_days: number;
  horizon_days: number;
}

const DashboardResults: React.FC = () => {
  // 1. Pull the stock symbol from the URL (e.g., /dashboard/GOOGL)
  const { symbol } = useParams<{ symbol: string }>();
  
  // 2. Pull the macro variables from the URL query string (e.g., ?inflation=3.2)
  const location = useLocation();

  // 3. Set up state to manage the API data, loading status, and errors
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 4. Fetch the data when the component mounts
  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetching from your local Uvicorn server
        const response = await fetch('http://127.0.0.1:8000/predict');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        
        const result: PredictionResponse = await response.json();
        setData(result);
      } catch (err: any) {
        console.error("Failed to fetch prediction:", err);
        setError(err.message || 'Failed to connect to the backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [symbol]); // The dependency array ensures it re-runs if the symbol changes

  // Helper to parse URL query params for display
  const queryParams = new URLSearchParams(location.search);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/macro/inflation" />
          </IonButtons>
          <IonTitle>{symbol} Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* State 1: Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <IonSpinner name="crescent" />
            <span style={{ marginLeft: '10px' }}>Running LSTM Model...</span>
          </div>
        )}

        {/* State 2: Error */}
        {!loading && error && (
          <IonCard color="danger">
            <IonCardHeader>
              <IonCardTitle>Connection Error</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {error}
              <p>Make sure your FastAPI server is running on port 8000.</p>
            </IonCardContent>
          </IonCard>
        )}

        {/* State 3: Success (Data Loaded) */}
        {!loading && data && (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Prediction Results for {data.ticker}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <h2>Last Known Price: <strong>${data.last_known_price}</strong> <IonText color="medium">({data.last_known_date})</IonText></h2>
                <h2>Predicted Price: <strong>${data.predicted_price}</strong> <IonText color="primary">({data.prediction_target_date})</IonText></h2>
                <hr style={{ margin: '15px 0', background: '#444' }} />
                <p><strong>Lookback Window:</strong> {data.lookback_days} days</p>
                <p><strong>Forecast Horizon:</strong> {data.horizon_days} days</p>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Macro Inputs Used</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <ul>
                  <li>Inflation: {queryParams.get('inflation')}%</li>
                  <li>Interest Rate: {queryParams.get('interestRate')}%</li>
                  <li>Unemployment: {queryParams.get('unemploymentRate')}%</li>
                  <li>GDP Growth: {queryParams.get('gdp')}%</li>
                </ul>
              </IonCardContent>
            </IonCard>
            
            {/* IN THE NEXT STEP: We will replace this placeholder with Recharts! */}
            <div style={{ textAlign: 'center', marginTop: '30px', color: 'gray' }}>
              [ Recharts Graph Will Go Here ]
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DashboardResults;