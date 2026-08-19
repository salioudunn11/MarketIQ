import './ExploreContainer.css';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonList,
  useIonRouter,
} from '@ionic/react';
import { useState } from 'react';

interface ContainerProps {
  name?: string;
  stockChosen?: string | null;
}

const ExploreContainer: React.FC<ContainerProps> = ({ stockChosen }) => {
  const router = useIonRouter();

  const [inflation, setInflation] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [unemploymentRate, setUnemploymentRate] = useState<string>('');
  const [gdp, setGdp] = useState<string>('');

  const activeSymbol = stockChosen || 'GOOGL';

  const handleExplore = () => {
    if (!inflation || !interestRate || !unemploymentRate || !gdp) {
      alert('Please fill out all required economic indicators.');
      return;
    }

    const queryParams = `?inflation=${encodeURIComponent(inflation)}&interestRate=${encodeURIComponent(interestRate)}&unemploymentRate=${encodeURIComponent(unemploymentRate)}&gdp=${encodeURIComponent(gdp)}`;

    // Pushes to the dynamic dashboard route matching App.tsx
    router.push(`/dashboard/${activeSymbol}${queryParams}`, 'forward', 'push');
  };

  return (
    <div id="container">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Macroeconomic Scenario Input</IonCardTitle>
          <IonCardSubtitle>
            Target Asset: <strong>{activeSymbol}</strong>
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="full">
            <IonItem>
              <IonInput
                labelPlacement="floating"
                placeholder="e.g. 3.2"
                type="number"
                step="0.1"
                value={inflation}
                onIonInput={(e) => setInflation(e.detail.value ?? '')}
              >
                <div slot="label">
                  Inflation Rate (%) <span style={{ color: 'var(--ion-color-danger)' }}>*</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                labelPlacement="floating"
                placeholder="e.g. 5.25"
                type="number"
                step="0.1"
                value={interestRate}
                onIonInput={(e) => setInterestRate(e.detail.value ?? '')}
              >
                <div slot="label">
                  Interest Rate (%) <span style={{ color: 'var(--ion-color-danger)' }}>*</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                labelPlacement="floating"
                placeholder="e.g. 4.0"
                type="number"
                step="0.1"
                value={unemploymentRate}
                onIonInput={(e) => setUnemploymentRate(e.detail.value ?? '')}
              >
                <div slot="label">
                  Unemployment Rate (%) <span style={{ color: 'var(--ion-color-danger)' }}>*</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                labelPlacement="floating"
                placeholder="e.g. 2.5"
                type="number"
                step="0.1"
                value={gdp}
                onIonInput={(e) => setGdp(e.detail.value ?? '')}
              >
                <div slot="label">
                  GDP Growth Rate (%) <span style={{ color: 'var(--ion-color-danger)' }}>*</span>
                </div>
              </IonInput>
            </IonItem>
          </IonList>

          <IonButton
            expand="block"
            color="primary"
            fill="solid"
            onClick={handleExplore}
            className="ion-margin-top"
          >
            Run Prediction Model
          </IonButton>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ExploreContainer;
