import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent,  IonSpinner } from '@ionic/react';
import { getGooglePrediction } from '../services/googleApi';
import { GooglePredictionResponse } from '../types/google';

export const GooglePredictionCard: React.FC = () => {
  const [data, setData] = useState<GooglePredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const result = await getGooglePrediction();
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { handleFetch(); }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Google (GOOGL) LSTM Prediction</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {loading ? <IonSpinner /> : data && (
          <div>
            <p>Last Price: ${data.last_known_price}</p>
            <p>Predicted Price ({data.prediction_target_date}): <strong>${data.predicted_price}</strong></p>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};