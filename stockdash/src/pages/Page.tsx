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

interface PageProps {
  stockChosen: string | null;
}

const Page: React.FC<PageProps> = ({ stockChosen }) => {

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

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar style={{ '--background': '#f9fafb' }}>
            <IonTitle size="large">{symbol || 'GOOGL'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} stockChosen={stockChosen} />
      </IonContent>
    </IonPage>
  );
};

export default Page;