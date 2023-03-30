import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRoute,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
import { AuthContext, useAuthInit } from './auth';
import NotFoundPage from './pages/NotFoundPage';
import {auth} from './firebase';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  const {loading,auth} = useAuthInit();

  console.log({loading,auth});
  if(loading){
    return <IonLoading isOpen={true}/>
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              {auth.loggedIn ? <Redirect to="/my/entries"/> :<LoginPage />}
            </Route>
            <Route exact path="/register">
              {auth.loggedIn ? <Redirect to="/my/entries"/> :<RegisterPage />}
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path='/' to="/my/entries"></Redirect>
            <Route>
              <NotFoundPage/>
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
