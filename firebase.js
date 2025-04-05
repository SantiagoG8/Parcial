import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAX8gO1W5lcb1iz1dfJvDESWkiUXmVZKWY",
  authDomain: "parcial-f8bd3.firebaseapp.com",
  projectId: "parcial-f8bd3",
  storageBucket: "parcial-f8bd3.firebasestorage.app",
  messagingSenderId: "268127084597",
  appId: "1:268127084597:web:a940ff699c6e1ec46cd17c",
  measurementId: "G-REXT12KFQZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
