import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDo9MVMq5B53bw88jBsoTpOTnjIbY3l25U",
    authDomain: "chatapp-27b84.firebaseapp.com",
    projectId: "chatapp-27b84",
    storageBucket: "chatapp-27b84.appspot.com",
    messagingSenderId: "586094175241",
    appId: "1:586094175241:web:d7dcbf94156178b6e0c4d8",
    measurementId: "G-R2XE4PLZ59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)

export { database }