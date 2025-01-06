// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIr9GdsVrKwTm-QBO_HkxkFOdaQWQfFGU",
  authDomain: "photography-blog-8f5ff.firebaseapp.com",
  projectId: "photography-blog-8f5ff",
  storageBucket: "photography-blog-8f5ff.firebasestorage.app",
  messagingSenderId: "359646994445",
  appId: "1:359646994445:web:c46d38cc6e48169e43b544",
  measurementId: "G-WNESHBFTQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);