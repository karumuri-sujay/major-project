// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBuWbXmeTj7z5oh7bBQUGajhOsj9PTwfGk",
    authDomain: "buspass-6f424.firebaseapp.com",
    projectId: "buspass-6f424",
    storageBucket: "buspass-6f424.appspot.com",
    messagingSenderId: "985414721483",
    appId: "1:985414721483:web:2e1844896eae132907e04e",
    measurementId: "G-FMYZ2LQ3DR"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore=app.firestore();