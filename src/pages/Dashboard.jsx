import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PHYSICIANS, STATES } from '../data/physicians'
import { Badge, Pill, ScoreBar } from '../components/Badges'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

export default function Dashboard() {
  const [q, setQ] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('ALL')
  const [minScore, setMinScore] = useState(60)
  const [sortKey, setSortKey] = useState('score')
  const [selectedPhysician, setSelectedPhysician] = useState(null)
  const [showNeedsAttentionTooltip, setShowNeedsAttentionTooltip] = useState(false)
  const nav = useNavigate()

  // Debug logging
  console.log('Dashboard component rendering')
  console.log('Recharts components available:', { BarChart, PieChart, ResponsiveContainer })

  const filtered = useMemo(() => {
    let rows = PHYSICIANS.slice()
    if (q.trim()) {
      const needle = q.toLowerCase()
      rows = rows.filter(r => `${r.name} ${r.npi}`.toLowerCase().includes(needle))
    }
    if (city.trim()) {
      const c = city.toLowerCase()
      rows = rows.filter(r => r.city.toLowerCase().includes(c))
    }
    if (state !== 'ALL') rows = rows.filter(r => r.state === state)
    if (minScore) rows = rows.filter(r => r.totalScore >= minScore)
    rows.sort((a, b) => sortKey === 'score' ? b.totalScore - a.totalScore : a.name.localeCompare(b.name))
    return rows
  }, [q, city, state, minScore, sortKey])

  // Analytics data
  const analytics = useMemo(() => {
    const totalPhysicians = PHYSICIANS.length
    const avgScore = PHYSICIANS.reduce((sum, p) => sum + p.totalScore, 0) / totalPhysicians
    const highPerformers = PHYSICIANS.filter(p => p.totalScore >= 80).length
    const lowPerformers = PHYSICIANS.filter(p => p.totalScore < 60).length
    
    // Score distribution - using actual data
    const scoreRanges = [
      { range: '90-100', count: PHYSICIANS.filter(p => p.totalScore >= 90).length, color: '#10b981' },
      { range: '80-89', count: PHYSICIANS.filter(p => p.totalScore >= 80 && p.totalScore < 90).length, color: '#059669' },
      { range: '70-79', count: PHYSICIANS.filter(p => p.totalScore >= 70 && p.totalScore < 80).length, color: '#0d9488' },
      { range: '60-69', count: PHYSICIANS.filter(p => p.totalScore >= 60 && p.totalScore < 70).length, color: '#0891b2' },
      { range: '50-59', count: PHYSICIANS.filter(p => p.totalScore >= 50 && p.totalScore < 60).length, color: '#7c3aed' },
      { range: '0-49', count: PHYSICIANS.filter(p => p.totalScore < 50).length, color: '#dc2626' }
    ]

    // State distribution - using actual data
    const stateData = STATES.map(s => ({
      state: s,
      count: PHYSICIANS.filter(p => p.state === s).length
    })).filter(d => d.count > 0).sort((a, b) => b.count - a.count)

    console.log('Analytics data:', { totalPhysicians, avgScore, scoreRanges, stateData })
    console.log('Score ranges with data:', scoreRanges.filter(range => range.count > 0))
    console.log('State data:', stateData)
    return { totalPhysicians, avgScore, highPerformers, lowPerformers, scoreRanges, stateData }
  }, [])

  const handlePhysicianClick = (physician) => {
    setSelectedPhysician(physician)
    nav(`/hcp/${physician.id}`)
  }

  return (
    <div className='space-y-6'>
      {/* Analytics Overview */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white rounded-2xl shadow p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Total Physicians</p>
              <p className='text-2xl font-bold text-slate-900'>{analytics.totalPhysicians}</p>
            </div>
            <div className='p-3 bg-blue-100 rounded-full'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Average Score</p>
              <p className='text-2xl font-bold text-slate-900'>{analytics.avgScore.toFixed(1)}</p>
            </div>
            <div className='p-3 bg-green-100 rounded-full'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>High Confidence</p>
              <p className='text-2xl font-bold text-green-600'>{PHYSICIANS.filter(p => p.confidence.label === 'High').length}</p>
            </div>
            <div className='p-3 bg-green-100 rounded-full'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>

        <div 
          className='bg-white rounded-2xl shadow p-6 relative cursor-pointer'
          onMouseEnter={() => setShowNeedsAttentionTooltip(true)}
          onMouseLeave={() => setShowNeedsAttentionTooltip(false)}
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Needs Attention</p>
              <p className='text-2xl font-bold text-pink-600'>{PHYSICIANS.filter(p => p.confidence.label === 'Low').length}</p>
            </div>
            <div className='p-3 bg-pink-100 rounded-full'>
              <svg className='w-6 h-6 text-pink-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
              </svg>
            </div>
          </div>

          {/* Needs Attention Tooltip */}
          {showNeedsAttentionTooltip && (
            <div className='absolute top-full right-0 mt-3 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 min-w-80 max-w-96'>
              <div className='font-semibold mb-2'>Physicians Needing Attention:</div>
              <div className='space-y-1 max-h-48 overflow-y-auto'>
                {PHYSICIANS.filter(p => p.confidence.label === 'Low')
                  .slice(0, 10) // Show first 10 to avoid overwhelming tooltip
                  .map((physician, index) => (
                    <div key={physician.id} className='flex items-center justify-between text-xs'>
                      <span className='truncate'>{physician.name}</span>
                      <span className='text-pink-300 ml-2'>Score: {physician.totalScore}</span>
                    </div>
                  ))}
                {PHYSICIANS.filter(p => p.confidence.label === 'Low').length > 10 && (
                  <div className='text-xs text-gray-400 pt-1 border-t border-gray-700'>
                    +{PHYSICIANS.filter(p => p.confidence.label === 'Low').length - 10} more physicians
                  </div>
                )}
              </div>
              <div className='absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900'></div>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Score Distribution Pie Chart */}
        <div className='bg-white rounded-2xl shadow p-6'>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>Score Distribution</h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={analytics.scoreRanges.filter(range => range.count > 0).map(range => ({
                    name: range.range,
                    value: range.count,
                    fill: range.color
                  }))}
                  cx='50%'
                  cy='50%'
                  outerRadius={70}
                  innerRadius={20}
                  paddingAngle={2}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) => percent > 0.05 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}
                >
                  {analytics.scoreRanges.filter(range => range.count > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='mt-4 text-sm text-slate-600'>
            Total: {analytics.totalPhysicians} physicians
          </div>
        </div>

        {/* State Distribution Bar Chart */}
        <div className='bg-white rounded-2xl shadow p-6'>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>Physicians by State</h3>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={analytics.stateData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='state' />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, 'Physicians']} />
                <Bar dataKey='count' fill='#3b82f6' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-2xl shadow p-6'>
        <h3 className='text-lg font-semibold text-slate-900 mb-4'>Search & Filter Physicians</h3>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 md:col-span-4'>
            <label className='text-xs font-semibold text-slate-600'>Search</label>
            <input 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              placeholder='Name or NPI…' 
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary' 
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <label className='text-xs font-semibold text-slate-600'>City</label>
            <input 
              value={city} 
              onChange={e => setCity(e.target.value)} 
              placeholder='City…' 
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary' 
            />
          </div>
          <div className='col-span-6 md:col-span-2'>
            <label className='text-xs font-semibold text-slate-600'>State</label>
            <select 
              value={state} 
              onChange={e => setState(e.target.value)} 
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-brand-primary'
            >
              <option value='ALL'>All</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className='col-span-6 md:col-span-2'>
            <label className='text-xs font-semibold text-slate-600'>Min Score</label>
            <input 
              type='number' 
              value={minScore} 
              onChange={e => setMinScore(Number(e.target.value) || 0)} 
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-brand-primary' 
            />
          </div>
          <div className='col-span-6 md:col-span-1'>
            <label className='text-xs font-semibold text-slate-600'>Sort</label>
            <select 
              value={sortKey} 
              onChange={e => setSortKey(e.target.value)} 
              className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-brand-primary'
            >
              <option value='score'>Score</option>
              <option value='name'>Name</option>
            </select>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className='mt-4 flex items-center justify-between text-sm text-slate-600'>
          <span>Showing {filtered.length} of {PHYSICIANS.length} physicians</span>
          <span>Average score: {(filtered.reduce((sum, p) => sum + p.totalScore, 0) / filtered.length || 0).toFixed(1)}</span>
        </div>
      </div>

      {/* Physicians Table */}
      <div className='bg-white rounded-2xl shadow overflow-hidden'>
        <div className='px-6 py-4 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-900'>Physician Profiles</h3>
        </div>
        <table className='w-full'>
          <thead className='bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600'>
            <tr>
              <th className='px-4 py-3'>Physician</th>
              <th className='px-4 py-3'>City/State</th>
              <th className='px-4 py-3'>Score</th>
              <th className='px-4 py-3'>Confidence</th>
              <th className='px-4 py-3'>Signals</th>
              <th className='px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className='border-t hover:bg-brand-light/50'>
                <td className='px-4 py-3'>
                  <div className='font-semibold'>{r.name}</div>
                  <div className='text-xs text-slate-600'>NPI {r.npi}</div>
                </td>
                <td className='px-4 py-3 text-sm'>{r.city}, {r.state}</td>
                <td className='px-4 py-3' style={{ minWidth: 160 }}>
                  <div className='flex items-center gap-3'>
                    <div className='w-28'>
                      <ScoreBar score={r.totalScore} />
                    </div>
                    <div className='text-sm font-semibold tabular-nums'>{r.totalScore}</div>
                  </div>
                </td>
                <td className='px-4 py-3'>
                  <Badge tone={r.confidence.tone}>
                    {r.confidence.label}
                  </Badge>
                </td>
                <td className='px-4 py-3 text-xs'>
                  <div className='flex flex-wrap gap-1'>
                    {r.signals.map((signal, i) => (
                      <Pill key={i} active>{signal}</Pill>
                    ))}
                  </div>
                </td>
                <td className='px-4 py-3'>
                  <button 
                    onClick={() => handlePhysicianClick(r)}
                    className='px-3 py-1.5 rounded-lg bg-brand-primary text-white text-sm hover:bg-brand-primary/90 transition-colors'
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
