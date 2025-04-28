import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import HomePage from './pages/Home';
import { CoveragePage } from './pages/Coverage';
import { Premium } from './pages/Premium';
import { Payment } from './pages/Payment';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { Claims } from './pages/Claims';
import { useAuthStore } from './store/auth';
import { CustomerPolicyPage } from './pages/customer-policy';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  console.log('Protected Route - User:', user); // Debug log
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { user, loading, initialize } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initialize();
      setIsInitialized(true);
    };
    init();
  }, [initialize]);

  // Only show loading state during initial auth check
  if (!isInitialized && loading) {
    return null; // Return null instead of loading message
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/customer-policy" element={user ? <CustomerPolicyPage /> : <Navigate to="/sign-in" />} />
          
          <Route 
            path="/coverage" 
            element={
              <ProtectedRoute>
                <CoveragePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/premium" 
            element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/payment-success" 
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/claims" 
            element={
              <ProtectedRoute>
                <Claims />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;