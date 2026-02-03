// Firebase Client Configuration
// This is for frontend (client-side) Firebase SDK

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA68nR-KcDC53Hh2vtzHMZnbFM8em5vNkg",
    authDomain: "modilipi-c91ce.firebaseapp.com",
    projectId: "modilipi-c91ce",
    storageBucket: "modilipi-c91ce.firebasestorage.app",
    messagingSenderId: "680458965911",
    appId: "1:680458965911:web:d0144f3dd0fe4ffb562ad2",
    measurementId: "G-2FGX3HY4N4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
