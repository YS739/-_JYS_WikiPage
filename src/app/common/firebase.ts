import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "jys-wikipage-80201.firebaseapp.com",
    projectId: "jys-wikipage-80201",
    storageBucket: "jys-wikipage-80201.appspot.com",
    messagingSenderId: "508207259959",
    appId: "1:508207259959:web:0ae54538275ab7002d7ab2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

