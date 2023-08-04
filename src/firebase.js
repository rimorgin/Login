import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgiFi3hsCwtI4IKStOiVSSFBMUMm62YZY",
  authDomain: "barangay-sta-ana-taytay.firebaseapp.com",
  projectId: "barangay-sta-ana-taytay",
  databaseURL: "https://barangay-sta-ana-taytay-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "barangay-sta-ana-taytay.appspot.com",
  messagingSenderId: "1030612899287",
  appId: "1:1030612899287:web:a0cadef3317ed453ed2792",
  measurementId: "G-C1QYYYVQH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;