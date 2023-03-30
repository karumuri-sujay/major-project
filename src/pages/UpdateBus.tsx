import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useState } from "react";
import { auth, firestore } from '../firebase';

interface Data{
    roll:string;
}

const UpdateBus:React.FC=()=>{
    const [year,setYear]=useState("");
    const [roll,setRoll]=useState("");

    const handleSave=async()=>{
        const finalRol=`2453${year}733${roll}`;
        let entryRef=firestore.collection('paidStudents').doc(finalRol);
        entryRef.set({isPaid:true});
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="" icon={chevronBack} />
                    </IonButtons>
                    <IonTitle>Update Bus Paid</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonLabel>Enter the Roll Number</IonLabel>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonInput disabled={true} value="2453"></IonInput>
                        </IonCol>
                        <IonCol>
                            <IonInput type="number" placeholder="Enter" value={year} onIonChange={e=>setYear(e.detail.value)}/>
                        </IonCol>
                        <IonCol>
                            <IonInput disabled={true} value="733"></IonInput>
                        </IonCol>
                        <IonCol>
                            <IonInput type="number" placeholder="Enter" value={roll} onIonChange={e=>setRoll(e.detail.value)}></IonInput>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton expand="block" onClick={handleSave}>Click</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default UpdateBus;