import {
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRouterLink,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { auth, firestore } from '../firebase';

interface Entry {
    roll: string,
    name: string,
    isStudent: boolean,
    isDriver: boolean,
    isAdmin:boolean
};

const Settings: React.FC = () => {
    const [entry, setEntry] = useState<Entry>({ roll: '', name: '', isStudent: false, isDriver: false,isAdmin:false});
    const { userId } = useAuth();
    // const history = useHistory();
    const [presentAlert] = useIonAlert();
    const [handlerMessage, setHandlerMessage] = useState('');
    useEffect(() => {
        const entriesRef = firestore.collection('app').doc(userId);
        entriesRef.get().then((doc) => {
            // console.log(doc.data());
            const entry = { ...doc.data() } as Entry;
            setEntry(entry);
        });
        // console.log(entriesRef.parent);
    }, [userId]);

    const handleSave = async () => {
        entry.isStudent = true;
        entry.isDriver = false;
        entry.isAdmin=false;
        if(entry.roll.length!==12){
            setHandlerMessage("This is Not the Correct Roll Number");
            setTimeout(function(){
                window.location.reload();
            },5000);
        }
        const entriesRef = firestore.collection('app').doc(userId);
        const entryData = await entriesRef.set(entry);
        // history.push("/my/entries");
        window.location.reload();
        // console.log(entryData);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {Object.keys(entry).length===0 && 
                    <IonList>
                        <IonItem>
                            <IonLabel position='floating'>Name</IonLabel>
                            <IonInput type='text' value={entry.name} onIonChange={(e) => entry.name = e.detail?.value} placeholder="Enter your name" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position='floating'>Roll No</IonLabel>
                            <IonInput type='text' onIonChange={(e) => entry.roll = e.detail?.value} value={entry.roll} placeholder="As per OU" />
                        </IonItem>
                        <IonButton expand='block' onClick={handleSave}>Submit</IonButton>
                    </IonList>
                }
                {handlerMessage!=='' && <IonLabel>{handlerMessage}</IonLabel>}
                {entry.isAdmin ? <IonLabel></IonLabel> :
                Object.keys(entry).length!==0 && 
                    <IonList>
                        <IonLabel>Details are entered into the database.</IonLabel>
                    </IonList>
                }
                <IonButton expand='block' onClick={() => auth.signOut()}>Logout</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
