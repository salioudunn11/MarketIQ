import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import Menu from './components/Menu';
import Page from './pages/Page';
import ChartsPage from './components/charts';

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

/**
 * Ionic Light/Dark Mode
 * Commenting out dark.system.css keeps the app consistently in Light Mode
 */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {/* Watchlist Sidebar */}
          <Menu />

          {/* Main Display Area */}
          <IonRouterOutlet id="main">
            {/* Redirect root URL straight to GOOG */}
            <Route path="/" exact={true}>
              <Redirect to="/stock/GOOG" />
            </Route>

            {/* Route matching the prediction charts page */}
            <Route path="/stock/:symbol/charts" exact={true} component={ChartsPage} />

            {/* Route matching stock watchlist selection */}
            <Route path="/stock/:symbol" exact={true} component={Page} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;