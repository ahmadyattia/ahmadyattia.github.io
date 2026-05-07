// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // Import getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shop-site-f7d59.firebaseapp.com",
  databaseURL: "https://shop-site-f7d59-default-rtdb.firebaseio.com",
  projectId: "shop-site-f7d59",
  storageBucket: "shop-site-f7d59.firebasestorage.app",
  messagingSenderId: "391624085515",
  appId: "1:391624085515:web:6be5af280cb84c66e5f70e",
  measurementId: "G-1Q7ELYHBCB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app); // Export the auth instance

// export default app;
