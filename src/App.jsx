import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Hcp from './pages/Hcp'
import Practices from './pages/Practices'
import Login from './pages/Login'
import logo from './assets/logo.png'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is authenticated on app load
    const authData = localStorage.getItem('uro360_auth')
    if (authData) {
      try {
        const userData = JSON.parse(authData)
        // Check if auth is not expired (24 hours)
        const isExpired = Date.now() - userData.ts > 24 * 60 * 60 * 1000
        if (!isExpired) {
          setIsAuthenticated(true)
          setUser(userData)
        } else {
          localStorage.removeItem('uro360_auth')
        }
      } catch (error) {
        localStorage.removeItem('uro360_auth')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('uro360_auth')
    setIsAuthenticated(false)
    setUser(null)
  }

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
  }

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      {isAuthenticated && (
        <header className='px-6 py-3 border-b bg-white sticky top-0 z-10'>
          <div className='max-w-7xl mx-auto flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img src={logo} alt='Hollister Uro360' className='h-8 w-auto object-contain' />
              <div>
                <h1 className='text-xl font-bold text-brand-primary'>Uro360</h1>
                <p className='text-xs text-slate-600'>Provider intelligence + best-practice enablement</p>
              </div>
            </div>
            <nav className='flex items-center gap-4 text-sm'>
              <Link to='/dashboard' className='px-3 py-1.5 rounded-lg hover:bg-brand-light'>
                Dashboard
              </Link>
              <Link to='/hcp/u1' className='px-3 py-1.5 rounded-lg hover:bg-brand-light'>
                HCP
              </Link>
              <Link to='/best-practices' className='px-3 py-1.5 rounded-lg hover:bg-brand-light'>
                Best Practices
              </Link>
              <button 
                onClick={handleLogout}
                className='px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700'
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
      )}
      
      <main className={isAuthenticated ? 'max-w-7xl mx-auto p-6' : ''}>
        <Routes>
          <Route path='/' element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
          } />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/hcp/:id' element={
            <ProtectedRoute>
              <Hcp />
            </ProtectedRoute>
          } />
          <Route path='/best-practices' element={
            <ProtectedRoute>
              <Practices />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      
      {isAuthenticated && (
        <footer className='py-6 text-center text-xs text-slate-500'>
          PHI-free demo • Hollister-themed • Mock data & APIs
        </footer>
      )}
    </div>
  )
}
