import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { store } from "./store/store";
import { Auth, Posts } from './pages/index';
import { Provider } from 'react-redux';
import { RouteGuard } from './components/index';

import './App.css';

setupIonicReact({
  mode: 'ios'
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/auth">
              <RouteGuard isPrivate={false} redirectTo="/posts">
                <Auth/>
              </RouteGuard>
            </Route>
            <Route exact path="/posts">
              <RouteGuard isPrivate={true} redirectTo="/auth">
                <Posts/>
              </RouteGuard>
            </Route>
            <Redirect to="/auth" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
}

export default App;