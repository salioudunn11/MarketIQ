import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Navigation Components & Pages */
import Menu from './components/Menu';
import Page from './pages/Page';
import LandingPage from './pages/LandingPage';
import DashboardResults from './pages/Charting-and-api/DasboardResults';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LandingPage from './pages/LandingPage';

setupIonicReact();

// 1. Dedicated Layout with SplitPane and Sidebar Menu for App Pages
const MainLayout: React.FC = () => {
  const [stockChosen, setStockChosen] = useState<string | null>('GOOGL');

  return (
    <IonSplitPane contentId="main">
      <Menu
        stockChosen={stockChosen}
        onSelectStock={setStockChosen}
      />

      <IonRouterOutlet id="main">

        <Route
          path="/macro/:name"
          exact={true}
          render={() => (
            <Page stockChosen={stockChosen} />
          )}
        />

        <Route
          path="/dashboard/:symbol"
          exact={true}
          component={DashboardResults}
        />

        <Redirect
          exact
          from="/dashboard"
          to="/macro/inflation"
        />

      </IonRouterOutlet>
    </IonSplitPane>
  );
};

// 2. Root App Router
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Full-Screen Landing Page */}
          <Route path="/" exact={true} component={LandingPage} />

          {/* App Views inside SplitPane */}
          <Route path="/dashboard" component={MainLayout} />
          <Route path="/macro" component={MainLayout} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;