import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

const firebaseapp = firebase.initializeApp ({
    apiKey: "AIzaSyB0j5sP7IzyxXKFnD_kRhpfk5V3vm4DNN4",
    authDomain: "instagram-clone-curso-1dc3d.firebaseapp.com",
    projectId: "instagram-clone-curso-1dc3d",
    storageBucket: "instagram-clone-curso-1dc3d.appspot.com",
    messagingSenderId: "497388299925",
    appId: "1:497388299925:web:0c9f05cc283c97fa7b9d9c",
    measurementId: "G-1X0L8Z0459"
  });


  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const functions = firebase.functions()


  export {db, auth, storage, functions}

  