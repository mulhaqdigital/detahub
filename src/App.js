import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Card from './components/Card';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import { ProjectProvider } from './context/ProjectContext';
import HomePage from './components/HomePage';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
