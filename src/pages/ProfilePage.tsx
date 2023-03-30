import {
    IonApp,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRouterLink,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    useIonAlert,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { auth, firestore } from '../firebase';
import '../theme/styles.css';

interface Entry {
    roll: string,
    name: string,
    isStudent: boolean,
    isDriver: boolean,
    isAdmin: boolean
};

const ProfilePage: React.FC = () => {
    const [entry, setEntry] = useState<Entry>({ roll: '', name: '', isStudent: false, isDriver: false , isAdmin:false});
    const { userId } = useAuth();
    useEffect(() => {
        const entriesRef = firestore.collection('app').doc(userId);
        entriesRef.get().then((doc) => {
            // console.log(doc.data());
            const entry = { ...doc.data() } as Entry;
            console.log(entry);
            setEntry(entry);
        });
        // console.log(entriesRef.parent);
    }, [userId]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent text-center="true" className="ion-padding">
                {(Object.keys(entry).length===0 || entry.name==='' || entry.roll==='') ? 
                    <IonList>
                        <IonItem>
                            <IonLabel>You haven't filled the details yet</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonButton fill='clear' expand='block' routerLink='/my/settings'>Click to enter details</IonButton>
                        </IonItem>
                    </IonList>
                :
                <div>
                    {/* <IonCard color="success">
                        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png"/>
                        <IonCardHeader>
                            <IonCardTitle>{entry.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            You are bagged with the Roll Number <b>{entry.roll}</b>. 
                            <br/>
                            You are a {entry.isStudent? <div><b>Student</b></div>:entry.isDriver?<div>Driver</div>:null}
                        </IonCardContent>
                    </IonCard> */}
                    <h3 className='heading'>YOUR DETAILS</h3>
                    &nbsp;
                    &nbsp;
                    <div text-center="true">
                        <IonThumbnail>
                                <img className='studentImage' alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg"/>
                        </IonThumbnail>
                    </div>
                    <IonList>
                        <IonItem>
                            <IonText>Name: </IonText>
                            <IonText><b>&nbsp; &nbsp; &nbsp;{entry.name}</b></IonText>
                        </IonItem>
                        <IonItem>
                            <IonText>Roll No: </IonText>
                            <IonText><b>&nbsp; &nbsp;{entry.roll}</b></IonText>
                        </IonItem>
                        {entry.isDriver || entry.isAdmin ? null :
                        <IonItem>
                            <IonText>Batch: </IonText>
                            <IonText><b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"20"+entry.roll.slice(4,6)+" - 20"+ ((parseInt(entry.roll.slice(4,6)))+4)}</b></IonText>
                        </IonItem>
                        }
                        <IonItem>
                            <IonText>Type: </IonText>
                            <IonText><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {entry.isStudent ? "Student".toUpperCase() : entry.isDriver ? "Driver".toUpperCase() : "Admin".toUpperCase()}</b></IonText>
                        </IonItem>
                    </IonList>
                </div>
                }
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
