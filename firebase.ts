// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpNUI-Op6Aq7-RW_qlNdLn6ze-yXn3HbU",
  authDomain: "netflix-clone-4d270.firebaseapp.com",
  projectId: "netflix-clone-4d270",
  storageBucket: "netflix-clone-4d270.appspot.com",
  messagingSenderId: "575517947703",
  appId: "1:575517947703:web:762b8b8b79577170d44cb2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }