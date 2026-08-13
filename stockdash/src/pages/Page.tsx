import React, { useState } from 'react';
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonList
} from '@ionic/react';
import { useParams, useHistory } from 'react-router';
import { GooglePredictionCard } from '../components/googleprediction';
import './Page.css';

const Page: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const history = useHistory();

  const normalizedSymbol = symbol?.toUpperCase();
  const isGoogle = !normalizedSymbol || normalizedSymbol === 'GOOG' || normalizedSymbol === 'GOOGL';

  // Modal open/close state
  const [showModal, setShowModal] = useState(false);

  // The 4 economic indicator inputs
  const [inflationRate, setInflationRate] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [unemploymentRate, setUnemploymentRate] = useState<string>('');
  const [gdp, setGdp] = useState<string>('');

  const handleRunPrediction = () => {
    setShowModal(false);

    // Navigate to the charts page, passing the inputs along as route state
    history.push({
      pathname: `/stock/${symbol}/charts`,
      state: {
        inflationRate: Number(inflationRate),
        interestRate: Number(interestRate),
        unemploymentRate: Number(unemploymentRate),
        gdp: Number(gdp),
      },
    });
  };

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
          <IonToolbar style={{ '--background': '#b3b6b958' }}>
            <IonTitle size="large">{symbol || 'GOOGL'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ maxWidth: '720px', margin: '20px auto' }}>
          {isGoogle ? (
            <>
              <GooglePredictionCard />

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <IonButton onClick={() => setShowModal(true)}>
                  Run Custom Prediction
                </IonButton>
              </div>
            </>
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

        {/* Prediction Inputs Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Prediction Inputs</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Inflation Rate (%)</IonLabel>
                <IonInput
                  type="number"
                  inputmode="decimal"
                  value={inflationRate}
                  placeholder="e.g. 3.2"
                  onIonInput={(e) => setInflationRate(e.detail.value ?? '')}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Interest Rate (%)</IonLabel>
                <IonInput
                  type="number"
                  inputmode="decimal"
                  value={interestRate}
                  placeholder="e.g. 5.25"
                  onIonInput={(e) => setInterestRate(e.detail.value ?? '')}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Unemployment Rate (%)</IonLabel>
                <IonInput
                  type="number"
                  inputmode="decimal"
                  value={unemploymentRate}
                  placeholder="e.g. 4.1"
                  onIonInput={(e) => setUnemploymentRate(e.detail.value ?? '')}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">GDP (Growth %, or absolute value)</IonLabel>
                <IonInput
                  type="number"
                  inputmode="decimal"
                  value={gdp}
                  placeholder="e.g. 2.8"
                  onIonInput={(e) => setGdp(e.detail.value ?? '')}
                />
              </IonItem>
            </IonList>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <IonButton expand="block" onClick={handleRunPrediction}>
                View Prediction Charts
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Page;