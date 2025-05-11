// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB30T667_YvYUYmHXwG35dbJ27FBlyvwkk",
  authDomain: "truebhoomi.firebaseapp.com",
  databaseURL: "https://truebhoomi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "truebhoomi",
  storageBucket: "truebhoomi.appspot.com",
  messagingSenderId: "196506650315",
  appId: "1:196506650315:web:51303629a9d5277b2afd4e",
  measurementId: "G-VYZ4BY6ZFL"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
