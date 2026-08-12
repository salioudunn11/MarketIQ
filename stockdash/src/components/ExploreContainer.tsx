import './ExploreContainer.css';
import {
  IonButton,
  IonCard,
  IonCardContent,
  
  IonInput,
  IonItem,
 
  IonList,
  
} from '@ionic/react';
import {useState} from 'react';
interface ContainerProps {

  name?: string;
stockChosen?: string | null;
}

const ExploreContainer: React.FC<ContainerProps> = ({ stockChosen }) => {
  const [inflation, setInflation] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [unemploymentRate, setUnemploymentRate] = useState<string>('');
  const [gdp, setGdp] = useState<string>('');

  const handleExplore = () => {
    // Handle the explore button click event here
    console.log({
     stock: stockChosen,
     inflation: parseFloat(inflation),
     interestRate: parseFloat(interestRate),
     unemploymentRate: parseFloat(unemploymentRate),
     gdp: parseFloat(gdp),
  });
  }
  
  return (
    <div id="container">

      
      <IonCard>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" value={inflation} onIonInput={(e) => setInflation(e.detail.value!)} >
                <div slot="label">
                  Inflation <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" value={interestRate} onIonInput={(e) => setInterestRate(e.detail.value!)}>
                <div slot="label">
                  Interest Rate <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" value={unemploymentRate} onIonInput={(e) => setUnemploymentRate(e.detail.value!)}>
                <div slot="label">
                  Unemployment Rate <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text" value={gdp} onIonInput={(e) => setGdp(e.detail.value!)}>
                <div slot="label">
                  GDP <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>


            </IonList> 
            <IonButton  color="primary" fill="solid" onClick={handleExplore} className="ion-margin-top">
              Explore
            </IonButton>

          </IonCardContent>
          
          </IonCard>
        
        
      
    </div>
  );
};

export default ExploreContainer;