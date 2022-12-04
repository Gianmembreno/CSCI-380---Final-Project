import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbUkWqATU4mZKi6yHBY03zlTWCXunl0uY",
  authDomain: "testingfirebase-26d7a.firebaseapp.com",
  projectId: "testingfirebase-26d7a",
  storageBucket: "testingfirebase-26d7a.appspot.com",
  messagingSenderId: "563683233529",
  appId: "1:563683233529:web:4512511319fa94e423dc28",
  measurementId: "G-VJB8S6S9KB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// Initialize Realtime Database and get a reference to the service
const database = getDatabase();

const signUpButton = document.getElementById("signUpBtn");
signUpButton.addEventListener("click", signUpUser);

function signUpUser() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var name = document.getElementById("name").value;
  var classCode = document.getElementById("classcode").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...

      set(ref(database, "users/" + classCode), {
        userid: user.uid,
        name: name,
        email: email,
        password: password,
      });

      alert("user created!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(error);
    });
}

const signInButton = document.getElementById("signInBtn");
signInButton.addEventListener("click", signInUser);

function signInUser() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      alert("user signed in!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
