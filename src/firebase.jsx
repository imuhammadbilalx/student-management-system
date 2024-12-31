// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnfNo-NFWwry6cx2I6gdt4KObH6zFXyAM",
  authDomain: "student-management-syste-72a05.firebaseapp.com",
  projectId: "student-management-syste-72a05",
  storageBucket: "student-management-syste-72a05.firebasestorage.app",
  messagingSenderId: "689236810475",
  appId: "1:689236810475:web:faa5e9c1122f3dd2767cae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };