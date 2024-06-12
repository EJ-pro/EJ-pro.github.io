// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAf-WEjvOdo8ZYxTAyCKkYAzdVzCDniSvM",
    authDomain: "ej-portfolio-389e6.firebaseapp.com",
    projectId: "ej-portfolio-389e6",
    storageBucket: "ej-portfolio-389e6.appspot.com",
    messagingSenderId: "4661022841",
    appId: "1:4661022841:web:8d16c866d6045059f884a8",
    measurementId: "G-37NZX3695V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the database for use in other files
export { db };
