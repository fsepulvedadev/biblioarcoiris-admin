import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDltiiD9rSgLBtXqpulE3JIaL4qrh7rfCk",
  authDomain: "biblioteca-arcoiris.firebaseapp.com",
  projectId: "biblioteca-arcoiris",
  storageBucket: "biblioteca-arcoiris.appspot.com",
  messagingSenderId: "941725273104",
  appId: "1:941725273104:web:e6358aff37a9122a6ace95",
});
// Firebase storage reference
const storage = getStorage(app);
export default storage;
