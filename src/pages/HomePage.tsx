import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner';
import {
    IonAlert,
    IonApp,
    IonButton,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert,
} from '@ionic/react';
import firebase from "firebase";
import '../theme/styles.css';
import { add, colorPalette, document, globe, text } from 'ionicons/icons';
import { chevronDownCircle, chevronUpCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth, firestore } from '../firebase';

export interface Member{
    name:string,
    roll:string,
    isDriver:boolean,
    isStudent:boolean,
    isAdmin:boolean
};



function toMember(x: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>){
    return {...x.data()} as Member;
}

const HomePage: React.FC = () => {
    const [member,setMember]=useState<Member>({name:'',roll:'',isDriver:false,isStudent:false,isAdmin:false});
    const {userId}=useAuth();
    const [paid,setPaid]=useState<boolean>(false);
    const [scannedData,setScannedData]=useState<any>();
    const [inputData,setInputData]=useState("");
    const [scanDetails,setScanDetails]=useState("");
    const [encodedData,setEncodedData]=useState<any>();
    const [entries,setEntries]=useState<Member[]>([]);
    useEffect(()=>{
        // const entriesRef=firestore.collection('app').doc(userId);
        // entriesRef.get().then((doc)=>{
        //     const entry={...doc.data()} as Member;
        //     setMember(entry);
        // });
        const entriesRef=firestore.collection('app');
        entriesRef.doc(userId).get().then((doc)=>{
            const entry={...doc.data()} as Member;
            setMember(entry);
        });
        entriesRef.onSnapshot(({docs})=>{
            setEntries(docs.map(toMember));
        });
    },[member, userId]);

    const options:BarcodeScannerOptions={
        preferFrontCamera:false,
        showFlipCameraButton: true,
        showTorchButton: true,
        torchOn: false,
        saveHistory:true,
        prompt: 'Place a barcode inside the scan area',
        resultDisplayDuration: 500,
        formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
        orientation: 'portrait',
        disableSuccessBeep: true,
    }

    const openScanner=()=>{
        // const data=await BarcodeScanner.scan(options);
        // console.log(data.text);
        BarcodeScanner.scan(options).then(barcodeData=>{
            console.log(barcodeData);
            setScannedData(barcodeData.text);
        }).catch(err=>{
            console.log(err);
        });
    }

    const createBarcode=()=>{
        setScannedData(`Money paid by ${member.roll}`);
        BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE,scannedData).then((encodedData)=>{
            console.log(encodedData);
            setEncodedData(encodedData);
        },(error)=>{
            console.log(error);
        });
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {member.isStudent ?
                        <IonGrid>
                            <IonList>
                                {(member.name!=='' || member.roll!=='') ? <></> : 
                                    <IonItem button routerLink='/my/settings'>Click here to fill the details</IonItem>
                                }
                            </IonList>
                            <div>
                                {/* Qr Code Generation */}
                                {userId && 
                                    firestore.collection('paidStudents').doc(member.roll).onSnapshot((doc)=>{
                                        // console.log(doc.data());
                                        setPaid(doc.data().isPaid);
                                    })
                                }
                                {paid ? 
                                <div>
                                    <IonList>
                                        <IonItem>Welcome Student, <b>{member.name}</b></IonItem>
                                        <IonButton expand='block' onClick={createBarcode}>Generate QR code</IonButton>
                                    </IonList>
                                    {encodedData && <div>{encodedData}</div>}
                                </div>
                                :
                                <IonList>
                                    <IonText color='danger'>You haven't paid the bus fees yet</IonText>
                                </IonList>
                                }
                                
                            </div>
                        </IonGrid>
                        :null
                    }
                    {member.isDriver ?
                        <IonList>
                            <IonItem>Welcome Driver, <b>{member.name}</b></IonItem>
                            <IonButton expand='block' onClick={openScanner}>Scan Barcode</IonButton>
                            {scannedData ?
                            // <IonAlert isOpen={true} header="Details of the Student" message={scannedData} buttons={["OK"]}/>
                            <div>
                                <IonItem> Scanned Data: {scannedData}</IonItem>
                            </div>
                            : null}
                        </IonList>
                        :null
                    }
                    {/* admin portal takes time */}
                    {member.isAdmin ?
                        <div>
                            <IonText className='welcome'>Welcome Admin <b>{member?.name.toUpperCase()}</b></IonText>
                            <br/><br/>
                            <IonList>
                                <IonItem button routerLink='/my/admin/addDriver'>Add Driver</IonItem>
                                <IonItem button routerLink='/my/admin/updateBus'>Update Students</IonItem>
                            </IonList>
                        </div>
                    : null
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
