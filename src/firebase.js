 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 import { getAuth } from "firebase/auth"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD1LzKWYo55CA_wsGnBH9s0N5a6uLJbeCw",
   authDomain: "rain-solutions.firebaseapp.com",
   databaseURL: "https://rain-solutions-default-rtdb.asia-southeast1.firebasedatabase.app", 
   projectId: "rain-solutions",
   storageBucket: "rain-solutions.appspot.com",
   messagingSenderId: "1002836583502",
   appId: "1:1002836583502:web:455a3593c4d728a27f4f1f"
 };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);

 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);
 export const auth = getAuth(app);