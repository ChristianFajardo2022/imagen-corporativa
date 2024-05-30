import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtH1eyr3S9CgddCLj-zjXdMJKPq4LZnu4",
    authDomain: "gerbet-52003.firebaseapp.com",
    projectId: "gerbet-52003",
    storageBucket: "gerbet-52003.appspot.com",
    messagingSenderId: "257889462821",
    appId: "1:257889462821:web:2117546bb91d1bf9be2dcc"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };