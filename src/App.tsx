import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Intro from './Intro';
import LandingPage from './LandingPage';
import Auth from './Auth';
import Dashboard from './Dashboard';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import { User, Language } from '../types';

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introFade, setIntroFade] = useState(false);
  const [language, setLanguage] = useState<Language>('gu'); 
  const [user, setUser] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let fadeTimeout: any;
    // Optimized delay for snappier performance
    const introTimeout = setTimeout(() => {
      setIntroFade(true);
      fadeTimeout = setTimeout(() => {
        setShowIntro(false);
      }, 400); 
    }, 1200); 

    return () => {
      clearTimeout(introTimeout);
      clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <div className={`fixed inset-0 z-[10000] transition-opacity duration-400 ${introFade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Intro />
        </div>
      )}
      
      {!showIntro && (
        <div className="animate-fadeIn min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<LandingPage language={language} setLanguage={setLanguage} />} />
            <Route path="/login" element={<Auth mode="login" language={language} setLanguage={setLanguage} onAuth={setUser} />} />
            <Route path="/register" element={<Auth mode="register" language={language} setLanguage={setLanguage} onAuth={setUser} />} />
            <Route path="/dashboard/*" element={user ? <Dashboard user={user} setUser={setUser} language={language} setLanguage={setLanguage} /> : <Navigate to="/login" />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
            <Route path="/admin/dashboard/*" element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
    </>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
