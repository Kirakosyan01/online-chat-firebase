// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8rWOtR5tV1U0WzjEXxtcG8T2Lw7OqRgo",
  authDomain: "online-chat-firebase-cd272.firebaseapp.com",
  projectId: "online-chat-firebase-cd272",
  storageBucket: "online-chat-firebase-cd272.appspot.com",
  messagingSenderId: "209899119459",
  appId: "1:209899119459:web:e2acbb81bb422a2a896956"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);