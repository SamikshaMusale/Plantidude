// SETTING UP FIREBASE WITH OUR WEBSITE

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDMW6cTA8XHYbGL10wbGmAQq84r4L_6e10",
  authDomain: "plantitude-9eb8e.firebaseapp.com",
  projectId: "plantitude-9eb8e",
  storageBucket: "plantitude-9eb8e.firebasestorage.app",
  messagingSenderId: "337612695551",
  appId: "1:337612695551:web:895548d43b2604374f29ca"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// SIGNUP FUNCTION
const signUp = (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log("Signup successful:", result);
    //   alert("You are signed up!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
      alert(error.message);
    });
};

// LOGIN FUNCTION
const login = (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log("Login successful:", result);
    //   alert("You are signed in!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert(error.message);
    });
};

// ADD EVENT LISTENERS BASED ON PAGE TITLE + submit-btn
window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const submitBtn = document.getElementById("submit-btn");

  if (!submitBtn) return;

  if (path.includes("signup.html")) {
    submitBtn.closest("form").addEventListener("submit", signUp);
  } else if (path.includes("login.html")) {
    submitBtn.closest("form").addEventListener("submit", login);
  }
});
