import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYKAFk8etyLRUguUjfdQ_nOp7CgR3nNU8",
  authDomain: "virtual-class-uas.firebaseapp.com",
  projectId: "virtual-class-uas",
  storageBucket: "virtual-class-uas.appspot.com",
  messagingSenderId: "964712775059",
  appId: "1:964712775059:web:2b9fa2fc4331af1dea3c66",
  measurementId: "G-0FQ6MGJPWY"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
