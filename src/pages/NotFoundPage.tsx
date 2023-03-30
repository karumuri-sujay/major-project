import {
    IonApp,
    IonContent,
    IonHeader,
    IonPage,
    IonRouterLink,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                Page Not Found
            </IonContent>
        </IonPage>
    );
};

export default NotFoundPage;
