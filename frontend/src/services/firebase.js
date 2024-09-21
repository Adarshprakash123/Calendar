// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxs_q7aKtXFIo6IlThJKn2cZ6M5YCkmGM",
  authDomain: "calendar-c6b9a.firebaseapp.com",
  projectId: "calendar-c6b9a",
  storageBucket: "calendar-c6b9a.appspot.com",
  messagingSenderId: "870167222182",
  appId: "1:870167222182:web:c0bd17ed7deb3646f12167",
  measurementId: "G-BK9SP4CLC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize the auth service
//const analytics = getAnalytics(app); // Initialize analytics if needed

export { auth }; // Export auth for use in other files
