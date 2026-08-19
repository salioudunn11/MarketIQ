import React, { useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Menu from '../components/Menu';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Dashboard.scss';

const Dashboard: React.FC = () => {
  // 1. Centralized state shared by both child components
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  return (
    // IonSplitPane creates a persistent sidebar on desktop and a collapsable drawer on mobile
    <IonSplitPane contentId="main-content"
    className="dashboard-split-pane"  
    >
      
      {/* 2. Menu receives the state value and the state setter callback */}
      <Menu
        stockChosen={selectedStock}
        onSelectStock={(symbol) => setSelectedStock(symbol)}
      />

      {/* 3. Main content container matching the contentId */}
      <IonPage id="main-content">
        <IonHeader className="dashboard-header">
          <IonToolbar className="dashboard-toolbar">
            <IonButtons slot="start">
              {/* Automatically displays a hamburger icon on mobile viewports */}
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              {selectedStock ? `MarketIQ — ${selectedStock}` : 'MarketIQ — Select a Stock'}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="ion-padding dashboard-content">
          {/* 4. ExploreContainer receives the selected stock to run validation checks */}
          <ExploreContainer stockChosen={selectedStock} />
        </IonContent>
      </IonPage>

    </IonSplitPane>
  );
};

export default Dashboard;