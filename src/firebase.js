import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLoYq6WUKHV9oBsl_JNyb33Q9hylevdi0",
  authDomain: "passgen-3465a.firebaseapp.com",
  projectId: "passgen-3465a",
  storageBucket: "passgen-3465a.appspot.com",
  messagingSenderId: "6266958288",
  appId: "1:6266958288:web:2b43242d65b58d2ff549d5",
  measurementId: "G-3QH5YY0M5V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };