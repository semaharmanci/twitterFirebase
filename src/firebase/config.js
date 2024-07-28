// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB35VEIuh7QiNdjSsluUKiuBDucRCbQkXY",
  authDomain: "twitterfirebase-b147b.firebaseapp.com",
  projectId: "twitterfirebase-b147b",
  storageBucket: "twitterfirebase-b147b.appspot.com",
  messagingSenderId: "236754171197",
  appId: "1:236754171197:web:87a7d14e474b71ab8b0154",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//!yetkilendirme kurulumu
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
