import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAAKdJWIN1D6pkGvdw5RCGHXCjOLO-2mgs",
    authDomain: "letmeask-4e356.firebaseapp.com",
    databaseURL: "https://letmeask-4e356-default-rtdb.firebaseio.com",
    projectId: "letmeask-4e356",
    storageBucket: "letmeask-4e356.appspot.com",
    messagingSenderId: "28932507801",
    appId: "1:28932507801:web:bc0b274c26fa1f8a8d1008"
}

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }