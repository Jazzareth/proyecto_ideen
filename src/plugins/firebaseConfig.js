import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDAKALQTNjOG1A9fGKtRzu2uKUhoQys0m8",
    authDomain: "webapp101-b5978.firebaseapp.com",
    projectId: "webapp101-b5978",
    storageBucket: "webapp101-b5978.appspot.com",
    messagingSenderId: "254221746114",
    appId: "1:254221746114:web:2e215b08075b76b536e05b",
    measurementId: "G-GEFLFHRLZM"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db= firebase.firestore();