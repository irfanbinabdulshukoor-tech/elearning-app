import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyChTKEFx1DVO9BUm6tqV3g6DpJd3aC4VXw",
  authDomain: "elearning--app-3fa94.firebaseapp.com",
  projectId: "elearning--app-3fa94",
  storageBucket: "elearning--app-3fa94.firebasestorage.app",
  messagingSenderId: "836576803573",
  appId: "1:836576803573:web:778143967d21883233a3bc",
  measurementId: "G-91ME0X81R3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };