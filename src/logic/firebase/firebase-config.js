import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyClWP14w7MrTQD42aHUTIY25vaRNoMpVN8",
    authDomain: "redux-d9447.firebaseapp.com",
    projectId: "redux-d9447",
    storageBucket: "redux-d9447.appspot.com",
    messagingSenderId: "676828266080",
    appId: "1:676828266080:web:0e40c7e583767ea7410d05",
    measurementId: "G-EPLJPNDHYC"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { db, googleAuthProvider, firebase }