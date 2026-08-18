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
import { useParams } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

interface PageProps {
  stockChosen: string | null;
}

const Page: React.FC<PageProps> = ({ stockChosen }) => {
  // Extract route parameters safely from URL path
  const { name, symbol } = useParams<{ name?: string; symbol?: string }>();

  // Consolidate symbol from URL param, prop state, or default fallback
  const activeSymbol = symbol || stockChosen || 'GOOGL';
  const normalizedSymbol = activeSymbol.toUpperCase();
  const isGoogle = normalizedSymbol === 'GOOG' || normalizedSymbol === 'GOOGL';

  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{activeSymbol} Analytics</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar style={{ '--background': '#f9fafb' }}>
            <IonTitle size="large">{activeSymbol}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} stockChosen={activeSymbol} />
      </IonContent>
    </IonPage>
  );
};

export default Page;