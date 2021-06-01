import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCx_yIaV5ZxpDNVgEQ3kncv-12WzcurJPw",
    authDomain: "proyecto-login-94386.firebaseapp.com",
    projectId: "proyecto-login-94386",
    storageBucket: "proyecto-login-94386.appspot.com",
    messagingSenderId: "946878885975",
    appId: "1:946878885975:web:c2d4de7b79446494b03312"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { db, googleAuthProvider, firebase }