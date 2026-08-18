import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from "react-router";
import Menu from './components/Menu';
import Page from './pages/Page';
import DashboardResults from './pages/Charting-and-api/DasboardResults';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          
          {/* Left Sidebar Menu */}
          <Menu 
            stockChosen={selectedStock} 
            onSelectStock={(symbol) => setSelectedStock(symbol)} 
          />

          {/* Right Main Content Outlet */}
          <IonRouterOutlet id="main">
            {/* 1. Root redirect */}
            <Route path="/" exact={true}>
              <Redirect to="/macro/inflation" />
            </Route>

            {/* 2. Main Form Page route */}
            <Route 
              path="/macro/:name" 
              exact={true} 
              render={() => <Page stockChosen={selectedStock} />} 
            />

            {/* 3. Dashboard Charting route (Inside the outlet) */}
            <Route path="/dashboard/:symbol" exact={true}>
              <DashboardResults />
            </Route>

            {/* 4. Catch-all fallback (MUST BE LAST) */}
            <Route>
              <Redirect to="/macro/inflation" />
            </Route>
          </IonRouterOutlet>

        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

