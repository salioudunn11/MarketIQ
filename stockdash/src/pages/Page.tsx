import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router';
import { GooglePredictionCard } from '../components/googleprediction';
import './Page.css';

const Page: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();

  const normalizedSymbol = symbol?.toUpperCase();
  const isGoogle = !normalizedSymbol || normalizedSymbol === 'GOOG' || normalizedSymbol === 'GOOGL';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{symbol || 'GOOGL'} Analytics</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" style={{ '--background': '#f9fafb' }}>
        <IonHeader collapse="condense">
          <IonToolbar style={{ '--background': '#f9fafb' }}>
            <IonTitle size="large">{symbol || 'GOOGL'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ maxWidth: '720px', margin: '20px auto' }}>
          {/* Display Python LSTM Model Card when GOOG/GOOGL is selected */}
          {isGoogle ? (
            <GooglePredictionCard />
          ) : (
            <div
              style={{
                padding: '24px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <h2 style={{ margin: '0 0 8px 0', color: '#111827', fontSize: '20px', fontWeight: '600' }}>
                {symbol} Overview
              </h2>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                Analytics for {symbol} are not yet available.
              </p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;