import {
    IonAlert,
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRouterLink,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { isPlatform, getPlatforms } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth, firestore } from '../firebase';


const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ loading: false, error: false });
    const [errorDesc, setErrorDesc] = useState('');
    const { loggedIn } = useAuth();

    const handleRegister = async () => {
        try {
            setStatus({ loading: true, error: false });
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            console.log(cred);
        } catch (error) {
            setStatus({ loading: false, error: true });
            setErrorDesc(error.message);
            console.log(error);
        }
    }

    if (loggedIn) {
        <Redirect to="/my/entries" />
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                    <IonLabel>{isPlatform('ios') ? <div>You are using <b>IPhone</b></div> : isPlatform('android') ? <div>You are using <b>Android</b></div> : null}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>User Name:</IonLabel>
                        <IonInput type='email' value={email} onIonChange={(e) => setEmail(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>Password</IonLabel>
                        <IonInput type='password' value={password} onIonChange={(e) => setPassword(e.detail.value)}></IonInput>
                    </IonItem>
                </IonList>
                {/* {status.error && <IonText color='danger'>Invalid</IonText>} */}
                {errorDesc && <IonAlert isOpen={true} message={errorDesc} buttons={["Ok"]}></IonAlert>}
                <IonButton expand='block' onClick={handleRegister}>Register</IonButton>
                <IonButton expand='block' fill='clear' routerLink='/login'>Already Have an Account</IonButton>
                <IonLoading isOpen={status.loading}></IonLoading>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;
