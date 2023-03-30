import {
    IonAlert,
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonPage,
    IonRouterLink,
    IonText,
    IonTitle,
    IonToolbar,
    isPlatform,
} from '@ionic/react';
import React, { useContext, useState } from 'react';
import { eye, eyeOff } from 'ionicons/icons';
import { Redirect } from 'react-router';
import {useAuth} from '../auth';
import {auth} from '../firebase';


const LoginPage: React.FC = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [status,setStatus]=useState({loading:false,error:false});
    const [errorDesc,setErrorDesc]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const [passwordToggleIcon,setPasswordToggleIcon]=useState("eye-outline");
    const {loggedIn}=useAuth();

    const handleLogin=async()=>{
        try {
            setStatus({loading:true,error:false});
            const cred=await auth.signInWithEmailAndPassword(email,password);
            console.log(cred);
        } catch (error) {
            setStatus({loading:false,error:true});
            setErrorDesc(error.message);
            console.log(error);
        }
    }

    const toggle=()=>{
        setShowPassword(!showPassword);
        setPasswordToggleIcon("eye-off");
    }

    if(loggedIn){
        <Redirect to="/my/entries"/>
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel>{isPlatform('ios') ? <div>You are using <b>IPhone</b></div> : isPlatform('android') ? <div>You are using <b>Android</b></div> : null}</IonLabel>
                    </IonItem>
                <IonList>
                    <IonItem>
                        <IonLabel position='floating'>User Name:</IonLabel>
                        <IonInput type='email' value={email} onIonChange={(e)=>setEmail(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='floating'>Password</IonLabel>
                        <IonInput name='password' type={showPassword ? 'text' : 'password'} value={password} onIonChange={(e)=>setPassword(e.detail.value)}></IonInput>
                        <IonIcon onClick={toggle} name={passwordToggleIcon} slot="end"/>
                    </IonItem>
                </IonList>
                {/* {status.error && <IonText color='danger'>Invalid</IonText>} */}
                {errorDesc && <IonAlert isOpen={true} message={errorDesc} buttons={["Ok"]}></IonAlert>}
                <IonButton expand='block' onClick={handleLogin}>Login</IonButton>
                <IonButton expand='block' fill='clear' routerLink='/register'>Don't Have an Account</IonButton>
                <IonLoading isOpen={status.loading}></IonLoading>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
