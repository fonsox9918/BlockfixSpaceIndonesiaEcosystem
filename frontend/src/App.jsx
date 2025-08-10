// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';

import NavbarBlockFix from "./components/navbar/NavbarBlockFix";
import ProtectedRoute from "./components/common/ProtectedRoute";
import BlockfixSpinner from './components/animasi/BlockfixSpinner';
// Context Auth
import { AuthProvider, useAuth } from './context/AuthContext';

// User Pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import NotFound from './pages/user/NotFound';
import Dashboard from './pages/user/Dashboard';
import MyOrdersPage from "./pages/user/MyOrdersPage";
import ProjectTrackerPage from './pages/user/ProjectTrackerPage';
import AccountPage from './pages/user/account/AccountPage';  
import RoomDesign from "./pages/user/RoomDesign";
import Marketplace from "./pages/user/Marketplace";
import CartPage from "./pages/user/CartPage";
import CheckoutPage from "./pages/user/CheckoutPage";

// Auth Pages
import Auth from './pages/auth/Auth';
import LoginEmail from './pages/auth/LoginEmail';
import Register from './pages/auth/Register';
import EmailVerification from './pages/auth/EmailVerification';
import CompleteRegistration from './pages/auth/CompleteRegistration';

// Global Pages
import NotAuthorized from './pages/NotAuthorized';

// Admin
import AdminRoutes from './routes/AdminRoutes';


function AppContent() {
  const location = useLocation();
  const noNavbarPaths = [
    '/auth',
    '/login-email',
    '/register',
    '/email-verification',
    '/completeregistration',
    '/catalog',
    '/marketplace'
  ];
  const isAdminPath = location.pathname.toLowerCase().startsWith('/admin');
  const hideNavbar =
    noNavbarPaths.includes(location.pathname.toLowerCase()) || isAdminPath;

  return (
    <div className="app">
      {!hideNavbar && <NavbarBlockFix />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/room-design" element={<RoomDesign />} />
          <Route path="/marketplace" element={<Marketplace />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/login-email" element={<LoginEmail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/complete-registration" element={<CompleteRegistration />} />

          {/* Admin Routes */}
          <Route 
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MyOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project-tracker"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <ProjectTrackerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account-page"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function AuthGate() {
  const { loading } = useAuth();
  if (loading) return <BlockfixSpinner />;
  return <AppContent />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthGate />
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;