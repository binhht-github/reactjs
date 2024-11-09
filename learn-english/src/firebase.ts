import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "api-learn-eng.firebaseapp.com",
    databaseURL: "https://api-learn-eng-default-rtdb.firebaseio.com",
    projectId: "api-learn-eng",
    storageBucket: "api-learn-eng.firebasestorage.app",
    messagingSenderId: "333829862864",
    appId: "1:333829862864:web:d3af8e4a3cc204e59f75d5",
    measurementId: "G-0TDHNZ801D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app)