import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth';



const app = firebase.initializeApp({
    "projectId": "mrinalseth3959",
    "appId": "1:1064621562122:web:de5b242d817ebe5758c2f3",
    "storageBucket": "mrinalseth3959.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyDLzHYC8FxN74QeNtfdbHLgZfI2b83vdHM",
    "authDomain": "mrinalseth3959.firebaseapp.com",
    "messagingSenderId": "1064621562122"
  });

  const db = app.firestore()

  export {app, db}