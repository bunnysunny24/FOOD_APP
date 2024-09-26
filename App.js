import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CollectorDashboard from './CollectorDashboard';
import LoginPage from './LoginPage';
import ProviderDashboard from './ProviderDashboard';

const App = () => {
  // This is a simple authentication check. In a real app, you'd use a more robust method.
  const isAuthenticated = () => !!localStorage.getItem('userType');

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/collector-dashboard" 
            element={
              <ProtectedRoute>
                <CollectorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/provider-dashboard" 
            element={
              <ProtectedRoute>
                <ProviderDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;