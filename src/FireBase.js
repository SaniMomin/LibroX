// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrP4GuIBM3OtpNZr1xpwMYfAQbyQBxI_w",
  authDomain: "librox-2a654.firebaseapp.com",
  projectId: "librox-2a654",
  storageBucket: "librox-2a654.firebasestorage.app",
  messagingSenderId: "665711257658",
  appId: "1:665711257658:web:a0cbe0415140963443ed03",
  measurementId: "G-TQDNJMERGP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebase_librox=getFirestore(app);