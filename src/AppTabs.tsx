import {
    IonApp,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonRoute,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState } from 'react';
import { Redirect, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import { home, settings ,atCircle } from 'ionicons/icons';
import EntryPage from './pages/EntryPage';
import { useAuth } from './auth';
import ProfilePage from './pages/ProfilePage';
import AddDriver from './pages/AddDriver';
import UpdateBus from './pages/UpdateBus';


const AppTabs: React.FC = () => {
    const { loggedIn } = useAuth();
    if (!loggedIn) {
        return <Redirect to="/login" />
    }
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/my/entries">
                    <HomePage />
                </Route>
                <Route exact path="/my/entries/:id">
                    <EntryPage />
                </Route>
                <Route exact path="/my/settings">
                    <Settings />
                </Route>
                <Route exact path="/my/profile">
                    <ProfilePage/>
                </Route>
                <Route exact path="/my/admin/addDriver">
                    <AddDriver/>
                </Route>
                <Route exact path="/my/admin/updateBus">
                    <UpdateBus/>
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
                <IonTabButton tab='home' href='/my/entries'>
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Settings' href='/my/settings'>
                    <IonIcon icon={settings} />
                    <IonLabel>Settings</IonLabel>
                </IonTabButton>
                <IonTabButton tab='Profile' href='/my/profile'>
                    <IonIcon icon={atCircle} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default AppTabs;
