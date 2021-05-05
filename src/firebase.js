import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyD4vaQi4ntEwQQnYm0Ifu25fkoOrkVFVQ4",
    authDomain: "snapchat-clone-hrithik.firebaseapp.com",
    projectId: "snapchat-clone-hrithik",
    storageBucket: "snapchat-clone-hrithik.appspot.com",
    messagingSenderId: "865875662711",
    appId: "1:865875662711:web:3200443b6a8825b36a7372",
    measurementId: "G-7M0C3JVKYZ"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{db,auth,storage,provider};