import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnHdoeuNO4JJGSIkwcmk3tZrt62b-Dv1A",
  authDomain: "auth-firebase-projeto-au-1fec5.firebaseapp.com",
  databaseURL: "https://auth-firebase-projeto-au-1fec5-default-rtdb.firebaseio.com",
  projectId: "auth-firebase-projeto-au-1fec5",
  storageBucket: "auth-firebase-projeto-au-1fec5.appspot.com",
  messagingSenderId: "643403882486",
  appId: "1:643403882486:web:02d76ad8d7b5bdb29c31d7",
  measurementId: "G-0WVH2T7W1T"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };