import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbKN-pGAsLMnEqD_PNSyLHRShCyto37HY",
    authDomain: "next-firebase-rb0133.firebaseapp.com",
    projectId: "next-firebase-rb0133",
    storageBucket: "next-firebase-rb0133.appspot.com",
    messagingSenderId: "218577844514",
    appId: "1:218577844514:web:d047cc8a27451203018d7b",
    measurementId: "G-Q13QYL2KB6"
  };

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);  
}else {
    firebase.app(); // if already initialized, use that one 
}  

export default firebase


/*import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmct_9jVbVS2kyCK82-CsLF2565hn8qog",
  authDomain: "next-firebase-rb3.firebaseapp.com",
  projectId: "next-firebase-rb3",
  storageBucket: "next-firebase-rb3.appspot.com",
  messagingSenderId: "73395168002",
  appId: "1:73395168002:web:04a4687b01311d8f27181b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };*/

//Inicializacion de firebase
/*import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROYECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID 
}

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);  
}else {
    firebase.app(); // if already initialized, use that one 
}  

export default firebase*/