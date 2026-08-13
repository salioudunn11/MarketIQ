import './ExploreContainer.css';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonList,
  useIonRouter // Add this import
} from '@ionic/react';
import { useState } from 'react';

interface ContainerProps {
  name?: string;
  stockChosen?: string | null;
}

const ExploreContainer: React.FC<ContainerProps> = ({ stockChosen }) => {
  const router = useIonRouter(); // Initialize the router hook

  const [inflation, setInflation] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [unemploymentRate, setUnemploymentRate] = useState<string>('');
  const [gdp, setGdp] = useState<string>('');

  const handleExplore = () => {
    // 1. Validate inputs (optional but recommended)
    if (!inflation || !interestRate || !unemploymentRate || !gdp) {
      alert("Please fill in all macro indicators.");
      return;
    }

    // 2. Default to a stock if none was selected in the Menu
    const targetSymbol = stockChosen || 'GOOGL'; 

    // 3. Construct the query string with the form values
    const queryParams = `?inflation=${encodeURIComponent(inflation)}&interestRate=${encodeURIComponent(interestRate)}&unemploymentRate=${encodeURIComponent(unemploymentRate)}&gdp=${encodeURIComponent(gdp)}`;

    // 4. Use the router to navigate to DashboardResults
    router.push(`/dashboard/${targetSymbol}${queryParams}`, 'forward', 'push');
  };
  
  return (
    <div id="container">
      <IonCard>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" type="number" value={inflation} onIonInput={(e) => setInflation(e.detail.value!)} >
                <div slot="label">
                  Inflation <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" type="number" value={interestRate} onIonInput={(e) => setInterestRate(e.detail.value!)}>
                <div slot="label">
                  Interest Rate <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" type="number" value={unemploymentRate} onIonInput={(e) => setUnemploymentRate(e.detail.value!)}>
                <div slot="label">
                  Unemployment Rate <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" type="number" value={gdp} onIonInput={(e) => setGdp(e.detail.value!)}>
                <div slot="label">
                  GDP <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>
            </IonList> 

            <IonButton color="primary" fill="solid" onClick={handleExplore} className="ion-margin-top">
              Explore
            </IonButton>
          </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ExploreContainer;