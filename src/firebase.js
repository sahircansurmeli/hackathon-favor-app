import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "../firebase-config.json";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };