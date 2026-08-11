import './ExploreContainer.css';
import {
  IonButton,
  IonCard,
  IonCardContent,
  
  IonInput,
  IonItem,
 
  IonList,
  
} from '@ionic/react';
import {useState, useEffect} from 'react';
interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div id="container">

      
      <IonCard>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text">
                <div slot="label">
                  Inflation <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text">
                <div slot="label">
                  Interest Rate <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text">
                <div slot="label">
                  Unemployment Rate <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput labelPlacement="floating" placeholder="Enter Text">
                <div slot="label">
                  GDP <span style={{ color: 'var(--ion-color-danger)' }}>(Required)</span>
                </div>
              </IonInput>
            </IonItem>


            </IonList> 
            <IonButton  color="primary" fill="solid" routerLink="/macro/inflation">
              Explore
            </IonButton>

          </IonCardContent>
          
          </IonCard>
        
        
      
    </div>
  );
};

export default ExploreContainer;
