import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase'; // Ensure the correct path
import './LoginPage.css'
function LoginPage() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User is signed in.
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default LoginPage;
