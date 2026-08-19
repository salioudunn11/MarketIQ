import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

interface PageProps {
  stockChosen: string | null;
}

const Page: React.FC<PageProps> = ({ stockChosen }) => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>
            {name
              ? name.charAt(0).toUpperCase() + name.slice(1)
              : 'Macroeconomic'}{' '}
            Analytics
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
        style={{ '--background': '#f9fafb' }}
      >
        <IonHeader collapse="condense">
          <IonToolbar style={{ '--background': '#f9fafb' }}>
            <IonTitle size="large">
              {name
                ? name.charAt(0).toUpperCase() + name.slice(1)
                : 'Macroeconomic'}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer stockChosen={stockChosen} />
      </IonContent>
    </IonPage>
  );
};

export default Page;