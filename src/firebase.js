import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBgwMlJoQHBu6AWH1iPNn0G48--X9cB2Bw",
    authDomain: "file-uploads-5219e.firebaseapp.com",
    projectId: "file-uploads-5219e",
    storageBucket: "file-uploads-5219e.appspot.com",
    messagingSenderId: "897080919540",
    appId: "1:897080919540:web:c747e97e68df4bdbd3a5a1",
    measurementId: "G-QWJNN1JR79"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const storage = firebaseApp.storage()
  export {storage}
  export default db
