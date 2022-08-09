
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const {REACT_APP_FIREBASE} = process.env;
// console.log(process.env, REACT_APP_FIREBASE, 'las varibles de entorno')

const firebaseConfig = {  
  apiKey: "AIzaSyDv4Idaet8iiQNoZcRZF2ReP0ptDZdiEHU",
  authDomain: "fir-challenge-a3e50.firebaseapp.com",
  projectId: "fir-challenge-a3e50",
  storageBucket: "fir-challenge-a3e50.appspot.com",
  messagingSenderId: "1083353774454",
  appId: "1:1083353774454:web:7667a1ea454cddbf48e257"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

