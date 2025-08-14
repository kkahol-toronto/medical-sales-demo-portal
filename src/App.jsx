import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Hcp from './pages/Hcp'
import Practices from './pages/Practices'
import Login from './pages/Login'
import logo from './assets/logo.png'

export default function App() {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
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
            <Link to='/' className='px-3 py-1.5 rounded-lg hover:bg-brand-light'>
              Dashboard
            </Link>
            <Link to='/hcp/u1' className='px-3 py-1.5 rounded-lg hover:bg-brand-light'>
              HCP
            </Link>
            <Link to='/best-practices' className='px-3 py-1.5 rounded-lg hover:bg-brand-light'>
              Best Practices
            </Link>
            <Link to='/login' className='px-3 py-1.5 rounded-lg bg-brand-primary text-white'>
              Login
            </Link>
          </nav>
        </div>
      </header>
      
      <main className='max-w-7xl mx-auto p-6'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/hcp/:id' element={<Hcp />} />
          <Route path='/best-practices' element={<Practices />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
      
      <footer className='py-6 text-center text-xs text-slate-500'>
        PHI-free demo • Hollister-themed • Mock data & APIs
      </footer>
    </div>
  )
}
