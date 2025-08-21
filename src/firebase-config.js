// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB3-brDxzfdV8eoVD2QClgSrT-9zX_rU9A",
  authDomain: "swift-cv.firebaseapp.com",
  projectId: "swift-cv",
  storageBucket: "swift-cv.firebasestorage.app",
  messagingSenderId: "484110997381",
  appId: "1:484110997381:web:dae210222407b6776816ec",
  measurementId: "G-6NP9EL180Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
