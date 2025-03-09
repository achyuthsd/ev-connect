
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAndELLvrt6let55KHGaDbYdsjsVsTG3ZI",
  authDomain: "ev-connect-adc3d.firebaseapp.com",
  projectId: "ev-connect-adc3d",
  storageBucket: "ev-connect-adc3d.firebasestorage.app",
  messagingSenderId: "185896072616",
  appId: "1:185896072616:web:e5561a934901f3a189d99d",
  measurementId: "G-8ZXPELCN8J"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
export const db = getFirestore(app);
export { createUserWithEmailAndPassword };