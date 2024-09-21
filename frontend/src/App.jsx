import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './services/firebase';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <CalendarPage /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
