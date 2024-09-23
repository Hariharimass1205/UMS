import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBlcXpL6rAKMgINveFw0dZgajGP8ToUogI",
  authDomain: "ums2-a05dd.firebaseapp.com",
  projectId: "ums2-a05dd",
  storageBucket: "ums2-a05dd.appspot.com",
  messagingSenderId: "607994487473",
  appId: "1:607994487473:web:b37d43448bb8c94e5af890",
  measurementId: "G-E7T7QNHKH1"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth

//config and export in main.js no need to wrap then go to signup page and get from firebase/auth