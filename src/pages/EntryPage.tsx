import {
    IonApp,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonRouterLink,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React from 'react';
import {Link, useParams} from 'react-router-dom';

interface RouteParams{
    id:string;
}

const EntryPage: React.FC = () => {
    const {id}=useParams<RouteParams>();
    // const entry=entries.find(x=>x.id===id);
    // if(!entry){
    //     throw new Error(`No Such Id: ${id}`);
    // }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton/>
                    </IonButtons>
                    {/* <IonTitle>{entry.title}</IonTitle> */}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {/* {entry.description} */}
            </IonContent>
        </IonPage>
    );
};

export default EntryPage;
