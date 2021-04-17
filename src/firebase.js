import * as firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "../firebase-config.json";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();