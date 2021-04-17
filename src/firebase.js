import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebase-config.json";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };