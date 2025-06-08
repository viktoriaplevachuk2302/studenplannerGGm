import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwcWUZXgrPi4IBUEx73u2_ILngSffknCc",
  authDomain: "student-planner-2b469.firebaseapp.com",
  projectId: "student-planner-2b469",
  storageBucket: "student-planner-2b469.appspot.com", // <-- виправлено тут
  messagingSenderId: "87176334254",
  appId: "1:87176334254:web:a9dd6a8c98040c32a0d63f",
  measurementId: "G-PHRXBKKRMX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
