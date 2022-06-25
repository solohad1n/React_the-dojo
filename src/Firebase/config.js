import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDhTjMGIN3M9pl9PWDOp7hyidbGBJW17hg",
  authDomain: "the-dojo-54095.firebaseapp.com",
  projectId: "the-dojo-54095",
  storageBucket: "the-dojo-54095.appspot.com",
  messagingSenderId: "971788191516",
  appId: "1:971788191516:web:fd51148eb5c1d1f4c45cd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);