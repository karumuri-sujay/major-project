import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useState } from "react";
import { auth, firestore } from '../firebase';

interface Entry {
    roll: string,
    name: string,
    isStudent: boolean,
    isDriver: boolean,
    isAdmin:boolean,
};

const AddDriver:React.FC=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [driverName,setDriverName]=useState("");
    const [driverRoll,setDriverRoll]=useState("");
    const [alertMessage,setAlertMessage]=useState("");
    const [entry,setEntry]=useState<Entry>({roll:"",name:"",isStudent:false,isDriver:false,isAdmin:false});

    const handleRegister=async()=>{
        const cred=await auth.createUserWithEmailAndPassword(email,password);
        console.log(cred.user.uid);
        const driverEntry:Entry={roll:driverRoll,name:driverName,isStudent:false,isDriver:true,isAdmin:false};
        console.log(driverEntry);
        setEntry(driverEntry);
        const entriesRef=firestore.collection('app').doc(cred.user.uid);
        const entriesData=await entriesRef.set(driverEntry);
        setAlertMessage("Details entered successfully");
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="" icon={chevronBack} />
                    </IonButtons>
                    <IonTitle>Add Driver</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position='floating'>User Name:</IonLabel>
                        <IonInput type='email' value={email} onIonChange={(e) => setEmail(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>Password</IonLabel>
                        <IonInput type='text' value={password} onIonChange={(e) => setPassword(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>Name of the Driver:</IonLabel>
                        <IonInput type='text' value={driverName} onIonChange={(e) => setDriverName(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>ID of the Driver:</IonLabel>
                        <IonInput type='text' value={driverRoll} onIonChange={(e) => setDriverRoll(e.detail.value)}></IonInput>
                    </IonItem>
                </IonList>
                <IonButton expand='block' onClick={handleRegister}>Register</IonButton>
                {alertMessage && <IonAlert isOpen={true} message={alertMessage} buttons={["OK"]}/>}
            </IonContent>
        </IonPage>
    )
}

export default AddDriver;