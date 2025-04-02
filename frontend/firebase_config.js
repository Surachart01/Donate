// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANuxsdN165hF71JDXEzFNQM5evaVfIDGA",
  authDomain: "room-booking-bc854.firebaseapp.com",
  projectId: "room-booking-bc854",
  storageBucket: "room-booking-bc854.firebasestorage.app",
  messagingSenderId: "137994106441",
  appId: "1:137994106441:web:471d7cdd3efd0da0f4f198",
  measurementId: "G-HBDP7RWRHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;