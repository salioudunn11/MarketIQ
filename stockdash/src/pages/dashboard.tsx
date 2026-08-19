import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const DEFAULT_SYMBOL = 'GOOGL';

const Dashboard: React.FC = () => {
  const history = useHistory();

  const [interestRate, setInterestRate] = useState<string>('');
  const [inflation, setInflation] = useState<string>('');
  const [unemploymentRate, setUnemploymentRate] = useState<string>('');
  const [gdp, setGdp] = useState<string>('');

  const allFieldsFilled =
    interestRate !== '' && inflation !== '' && unemploymentRate !== '' && gdp !== '';

  const handleExecute = () => {
    if (!allFieldsFilled) return;

    const params = new URLSearchParams({
      inflation,
      interestRate,
      unemploymentRate,
      gdp,
    });

    history.push(`/dashboard/${DEFAULT_SYMBOL}?${params.toString()}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MarketIQ Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Enter Economic Scenario</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ marginBottom: '20px', color: 'var(--ion-color-medium)' }}>
              Input hypothetical economic conditions to see a 30-day projected
              trajectory for AAPL, MSFT, and GOOGL.
            </p>

            <IonItem>
              <IonLabel position="stacked">Interest Rate (%)</IonLabel>
              <IonInput
                type="number"
                placeholder="e.g. 5.25"
                value={interestRate}
                onIonInput={(e) => setInterestRate(e.detail.value ?? '')}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Inflation Rate (%)</IonLabel>
              <IonInput
                type="number"
                placeholder="e.g. 3.1"
                value={inflation}
                onIonInput={(e) => setInflation(e.detail.value ?? '')}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Unemployment Rate (%)</IonLabel>
              <IonInput
                type="number"
                placeholder="e.g. 4.0"
                value={unemploymentRate}
                onIonInput={(e) => setUnemploymentRate(e.detail.value ?? '')}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">GDP Growth (%)</IonLabel>
              <IonInput
                type="number"
                placeholder="e.g. 2.5"
                value={gdp}
                onIonInput={(e) => setGdp(e.detail.value ?? '')}
              />
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              disabled={!allFieldsFilled}
              onClick={handleExecute}
            >
              Execute
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
