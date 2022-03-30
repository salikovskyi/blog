
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage, uploadBytes , ref } from "firebase/storage";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

 
// import * as firebase from 'firebase/app'
// import 'firebase/storage'
// import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACofIVxv6tqKBIA54C_BD5pV1-eqf06Zc",
  authDomain: "reactblogproject.firebaseapp.com",
  projectId: "reactblogproject",
  storageBucket: "reactblogproject.appspot.com",
  messagingSenderId: "376460677088",
  appId: "1:376460677088:web:02147f25d0f42b7fba2585"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
// const projectFirestore = firebase.firestore()
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const storageRef = ref(storage, 'some-child');
