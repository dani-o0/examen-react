import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7S41Wih8f5uS8lSV-SqNAt9cxhGLCLFw",
  authDomain: "examen-react-64dc9.firebaseapp.com",
  projectId: "examen-react-64dc9",
  storageBucket: "examen-react-64dc9.firebasestorage.app",
  messagingSenderId: "849948185004",
  appId: "1:849948185004:web:94931e17902f80e2b06a09"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_STORAGE = getFirestore(FIREBASE_APP);