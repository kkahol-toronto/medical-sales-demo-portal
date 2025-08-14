import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('rep@hollister.com')
  const [password, setPassword] = useState('demo123')
  const [role, setRole] = useState('sales_rep')
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('uro360_auth', JSON.stringify({
      email,
      role,
      ts: Date.now()
    }))
    nav('/')
  }

  return (
    <div className='min-h-screen grid place-items-center bg-slate-50'>
      <form onSubmit={onSubmit} className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-brand-primary'>Uro360 — Login</div>
          <div className='text-sm text-slate-600 mt-1'>Demo auth (role-based access)</div>
        </div>

        <div>
          <label className='text-xs font-semibold text-slate-600'>Email</label>
          <input 
            type='email'
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent' 
            placeholder='Enter your email'
          />
        </div>

        <div>
          <label className='text-xs font-semibold text-slate-600'>Password</label>
          <div className='relative mt-1'>
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className='w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent' 
              placeholder='Enter your password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600'
            >
              {showPassword ? (
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                </svg>
              ) : (
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                </svg>
              )}
            </button>
          </div>
          <div className='text-xs text-slate-500 mt-1'>Demo password: demo123</div>
        </div>

        <div>
          <label className='text-xs font-semibold text-slate-600'>Role</label>
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)} 
            className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent'
          >
            <option value='sales_rep'>Sales Rep</option>
            <option value='manager'>Manager</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <button 
          type='submit' 
          className='w-full px-4 py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 transition-colors'
        >
          Sign in
        </button>

        <div className='text-center text-xs text-slate-500'>
          <p>Demo credentials for testing</p>
          <p className='mt-1'>Email: rep@hollister.com | Password: demo123</p>
        </div>
      </form>
    </div>
  )
}
