import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBqlCBuyVGEAc8iaoKpDYKjRlMNtlpCRs",
  authDomain: "algoaccessibility.firebaseapp.com",
  projectId: "algoaccessibility",
  storageBucket: "algoaccessibility.appspot.com",
  messagingSenderId: "822143441315",
  appId: "1:822143441315:web:52379c87b9919adf852216",
  measurementId: "G-V9FC9XS31S",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
