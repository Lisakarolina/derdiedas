import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  documentId,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "./fb_config.js";

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "words");

function generateKey() {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return (
    characters.charAt(Math.floor(Math.random() * characters.length)) +
    characters.charAt(Math.floor(Math.random() * characters.length))
  );
}

export default async function getRandomWord() {
  let key = generateKey();
  let q1 = query(colRef, where(documentId(), ">=", key), limit(1));
  let q2 = query(colRef, where(documentId(), "<", key), limit(1));
  let q_res1 = await getDocs(q1);
  if (q_res1) {
    return q_res1.docs[0].data();
  } else {
    await getDocs(q2).then((docs) => {
      return docs[0].data();
    });
  }
}
