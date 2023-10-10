// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNplvGXgSnE0JbgEvjX-Vtwl6eYUG8jSs",
  authDomain: "careers4u-e6d4f.firebaseapp.com",
  projectId: "careers4u-e6d4f",
  storageBucket: "careers4u-e6d4f.appspot.com",
  messagingSenderId: "1010367396522",
  appId: "1:1010367396522:web:a371569496d229e3acaed3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth}