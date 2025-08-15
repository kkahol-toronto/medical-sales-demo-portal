import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PHYSICIANS } from '../data/physicians'
import { Badge, ProvenanceRow } from '../components/Badges'
import ScoreChart from '../components/ScoreChart'
import Tabs from '../components/Tabs'
import { fetchNpiProfile, fetchOpenPaymentsSummary, fetchProductUtilization, fetchTripNotes, refreshData } from '../api/mock'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

function summarizeTripNotes(notes) {
  const count = notes.length
  const keywords = []
  notes.forEach(n => {
    const s = n.summary.toLowerCase()
    if (s.includes('cauti')) keywords.push('CAUTI bundle')
    if (s.includes('intermittent')) keywords.push('intermittent education')
    if (s.includes('trial')) keywords.push('pilot/trial')
    if (s.includes('pricing')) keywords.push('pricing clarity')
  })
  const uniq = Array.from(new Set(keywords))
  const nba = uniq.includes('pilot/trial') 
    ? 'Propose micro-trial with 90-day follow-up'
    : uniq.includes('intermittent education')
    ? 'Offer intermittent education kit + teach-back checklist'
    : 'Send decision aid + book follow-up'
  return {
    summary: `Last ${count} visits highlight: ${uniq.join(', ') || 'general interest'}.`,
    nextBestAction: nba,
    talkTrack: 'Open with workflow improvement and CAUTI risk reduction; tailor assets to ASC/office setting.'
  }
}



export default function Hcp() {
  const { id } = useParams()
  const doc = useMemo(() => PHYSICIANS.find(p => p.id === id), [id])
  const [tab, setTab] = useState('Product Utilization')
  const [util, setUtil] = useState(null)
  const [notes, setNotes] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [showAddNote, setShowAddNote] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const [u, n] = await Promise.all([
        fetchProductUtilization(doc.npi),
        fetchTripNotes(doc.npi)
      ])
      if (mounted) {
        setUtil(u)
        setNotes(n)
      }
    })()
    return () => {
      mounted = false
    }
  }, [doc.npi])

  if (!doc) {
    return (
      <div className='p-6'>
        Not found. <Link className='text-brand-primary underline' to='/'>Go back</Link>
      </div>
    )
  }

  const trend = util ? (util.months.at(-1).intermittent - util.months[0].intermittent) : 0
  const trendLabel = trend > 0 ? '↑ increasing' : '↔ stable'
  const summary = notes ? summarizeTripNotes(notes) : null

  // Enhanced analytics data
  const analytics = useMemo(() => {
    if (!util) return null
    
    const totalIntermittent = util.months.reduce((sum, m) => sum + m.intermittent, 0)
    const totalIndwelling = util.months.reduce((sum, m) => sum + m.indwelling, 0)
    const totalVolume = totalIntermittent + totalIndwelling
    
    const monthlyGrowth = util.months.map((month, index) => {
      if (index === 0) return { month: month.month, growth: 0 }
      const prevMonth = util.months[index - 1]
      const currentTotal = month.intermittent + month.indwelling
      const prevTotal = prevMonth.intermittent + prevMonth.indwelling
      return {
        month: month.month,
        growth: prevTotal > 0 ? ((currentTotal - prevTotal) / prevTotal) * 100 : 0
      }
    })

    // Mock HCP intelligence data
    const publications = [
      { month: 'Jan', count: 2 },
      { month: 'Feb', count: 1 },
      { month: 'Mar', count: 3 },
      { month: 'Apr', count: 0 },
      { month: 'May', count: 2 },
      { month: 'Jun', count: 1 }
    ]

    const conferences = [
      { name: 'AUA Annual Meeting', date: '2024-05-15', role: 'Speaker' },
      { name: 'SUFU Winter Meeting', date: '2024-02-20', role: 'Attendee' },
      { name: 'ACS Clinical Congress', date: '2024-10-22', role: 'Panelist' }
    ]

    const jobPostings = [
      { title: 'Urology Nurse Practitioner', date: '2024-06-01', status: 'Active' },
      { title: 'Medical Assistant', date: '2024-05-15', status: 'Active' },
      { title: 'Practice Manager', date: '2024-04-20', status: 'Filled' }
    ]

    const socialMediaKeywords = [
      { word: 'CAUTI', count: 12, color: '#3b82f6' },
      { word: 'Intermittent', count: 8, color: '#10b981' },
      { word: 'Patient Care', count: 6, color: '#f59e0b' },
      { word: 'Research', count: 5, color: '#ef4444' },
      { word: 'Innovation', count: 4, color: '#8b5cf6' },
      { word: 'Education', count: 3, color: '#06b6d4' }
    ]

    console.log('HCP Analytics data:', { totalVolume, publications, conferences, jobPostings, socialMediaKeywords })
    return {
      totalVolume,
      totalIntermittent,
      totalIndwelling,
      monthlyGrowth,
      publications,
      conferences,
      jobPostings,
      socialMediaKeywords,
      avgMonthlyVolume: totalVolume / util.months.length
    }
  }, [util])

  const onRefresh = async () => {
    setRefreshing(true)
    await refreshData(doc.npi)
    const u = await fetchProductUtilization(doc.npi)
    setUtil(u)
    setRefreshing(false)
  }

  return (
    <div className='space-y-4'>
      <div className='bg-white rounded-2xl shadow p-5'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h2 className='text-xl font-bold'>{doc.name}</h2>
            <div className='text-sm text-slate-600'>{doc.city}, {doc.state} · NPI {doc.npi}</div>
          </div>
          <div className='text-right'>
            <div className='text-3xl font-extrabold tabular-nums text-brand-primary'>{doc.totalScore}</div>
            <div className='text-xs text-slate-500'>Uro360 Score</div>
          </div>
        </div>
        <div className='mt-4'>
          <ScoreChart factors={doc.factors} />
        </div>
      </div>

      {/* AI Summary & Contact Information */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* AI Summary */}
        <div className='bg-white rounded-2xl shadow p-5'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-slate-900'>AI Sales Intelligence</h3>
          </div>
          
          <div className='space-y-4'>
            <div>
              <h4 className='font-medium text-slate-900 mb-2'>Key Insights</h4>
              <ul className='text-sm text-slate-600 space-y-1'>
                <li>• {doc.confidence.label} confidence level indicates {doc.confidence.label === 'High' ? 'strong engagement potential' : doc.confidence.label === 'Medium' ? 'moderate opportunity for growth' : 'needs focused attention'}</li>
                <li>• {doc.signals.length} active signals detected: {doc.signals.join(', ')}</li>
                <li>• {analytics?.totalVolume > 1000 ? 'High-volume' : analytics?.totalVolume > 500 ? 'Medium-volume' : 'Low-volume'} practice with {analytics?.totalIntermittent > analytics?.totalIndwelling ? 'preference for intermittent catheters' : 'balanced product mix'}</li>
                <li>• {doc.pubs} publications in last 12 months shows {doc.pubs > 5 ? 'strong research engagement' : doc.pubs > 2 ? 'moderate academic interest' : 'clinical focus'}</li>
              </ul>
            </div>

            <div>
              <h4 className='font-medium text-slate-900 mb-2'>Recommended Actions</h4>
              <ul className='text-sm text-slate-600 space-y-1'>
                <li>• {doc.totalScore >= 80 ? 'Maintain relationship with premium support' : doc.totalScore >= 60 ? 'Focus on value proposition and education' : 'Prioritize relationship building and basic education'}</li>
                <li>• {doc.factors.E > 0.7 ? 'High engagement - leverage for testimonials' : 'Increase engagement through regular check-ins'}</li>
                <li>• {doc.factors.A > 0.8 ? 'Evidence-focused - share latest clinical data' : 'Provide evidence-based education materials'}</li>
                <li>• {doc.factors.B > 0.8 ? 'Volume optimization opportunity - discuss scaling strategies' : 'Explore volume growth potential'}</li>
              </ul>
            </div>

            <div className='bg-blue-50 rounded-lg p-3'>
              <div className='flex items-center gap-2 mb-2'>
                <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
                <span className='font-medium text-blue-900'>Next Visit Scheduled</span>
              </div>
              <p className='text-sm text-blue-800'>
                {(() => {
                  const nextVisit = new Date()
                  nextVisit.setDate(nextVisit.getDate() + Math.floor(Math.random() * 14) + 7) // 7-21 days from now
                  return nextVisit.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                })()}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className='bg-white rounded-2xl shadow p-5'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-slate-900'>Contact Information</h3>
          </div>
          
          <div className='space-y-4'>
            <div>
              <h4 className='font-medium text-slate-900 mb-2'>Practice Details</h4>
              <div className='text-sm text-slate-600 space-y-1'>
                <p><strong>Practice:</strong> {doc.facility.name}</p>
                <p><strong>Address:</strong> {doc.city}, {doc.state}</p>
                <p><strong>Phone:</strong> (505) {Math.floor(Math.random() * 900) + 100}-{Math.floor(Math.random() * 9000) + 1000}</p>
                <p><strong>Email:</strong> {doc.name.toLowerCase().replace('dr. ', '').replace(' ', '.')}@{doc.facility.name.toLowerCase().split(' ').join('')}.com</p>
              </div>
            </div>

            <div>
              <h4 className='font-medium text-slate-900 mb-2'>Preferred Contact</h4>
              <div className='text-sm text-slate-600 space-y-1'>
                <p><strong>Best Time:</strong> {['Morning (9-11 AM)', 'Afternoon (2-4 PM)', 'Evening (5-6 PM)'][Math.floor(Math.random() * 3)]}</p>
                <p><strong>Preferred Method:</strong> {['Phone', 'Email', 'In-person'][Math.floor(Math.random() * 3)]}</p>
                <p><strong>Gatekeeper:</strong> {['Receptionist', 'Nurse Manager', 'Practice Manager'][Math.floor(Math.random() * 3)]}</p>
              </div>
            </div>

            <div>
              <h4 className='font-medium text-slate-900 mb-2'>Recent Interactions</h4>
              <div className='text-sm text-slate-600 space-y-1'>
                <p><strong>Last Visit:</strong> {(() => {
                  const lastVisit = new Date()
                  lastVisit.setDate(lastVisit.getDate() - Math.floor(Math.random() * 30) + 5) // 5-35 days ago
                  return lastVisit.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })
                })()}</p>
                <p><strong>Next Follow-up:</strong> {(() => {
                  const nextFollowup = new Date()
                  nextFollowup.setDate(nextFollowup.getDate() + Math.floor(Math.random() * 14) + 7) // 7-21 days from now
                  return nextFollowup.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })
                })()}</p>
                <p><strong>Relationship Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doc.totalScore >= 80 ? 'bg-green-100 text-green-800' : 
                  doc.totalScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {doc.totalScore >= 80 ? 'Strong' : doc.totalScore >= 60 ? 'Developing' : 'Needs Attention'}
                </span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='bg-white rounded-2xl shadow p-5'>
        <div className='mt-5'>
          <Tabs tabs={['Product Utilization', 'Trip Notes']} active={tab} onChange={setTab} />
          {tab === 'Product Utilization' && (
            <div className='mt-4 space-y-6'>
              {!util ? (
                <div className='text-sm text-slate-500'>Loading…</div>
              ) : (
                <>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='text-sm text-slate-600'>Last updated {util.lastUpdated}</div>
                    <button 
                      onClick={onRefresh} 
                      className='px-3 py-1.5 rounded-lg text-sm bg-brand-primary text-white hover:bg-brand-primary/90'
                    >
                      {refreshing ? 'Refreshing…' : 'Refresh data'}
                    </button>
                  </div>

                  {/* Key Metrics */}
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Total Volume</div>
                      <div className='text-2xl font-bold text-slate-900'>{analytics?.totalVolume || 0}</div>
                    </div>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Intermittent</div>
                      <div className='text-2xl font-bold text-blue-600'>{analytics?.totalIntermittent || 0}</div>
                    </div>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Indwelling</div>
                      <div className='text-2xl font-bold text-red-600'>{analytics?.totalIndwelling || 0}</div>
                    </div>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Avg Monthly</div>
                      <div className='text-2xl font-bold text-slate-900'>{analytics?.avgMonthlyVolume?.toFixed(0) || 0}</div>
                    </div>
                  </div>

                  {/* Main Chart */}
                  <div className='bg-white rounded-xl border p-4'>
                    <h4 className='text-lg font-semibold text-slate-900 mb-4'>Product Utilization Trends</h4>
                    <div className='h-64'>
                      <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={util.months}>
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='month' />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type='monotone' dataKey='intermittent' stroke='#3b82f6' strokeWidth={2} />
                          <Line type='monotone' dataKey='indwelling' stroke='#ef4444' strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Additional Charts */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Publications Chart */}
                    <div className='bg-white rounded-xl border p-4'>
                      <h4 className='text-lg font-semibold text-slate-900 mb-4'>Publications (Last 6 Months)</h4>
                      <div className='h-48'>
                        {console.log('Rendering Publications Chart')}
                        <ResponsiveContainer width='100%' height='100%'>
                          <BarChart data={[
                            { month: 'Jan', count: 2 },
                            { month: 'Feb', count: 1 },
                            { month: 'Mar', count: 3 },
                            { month: 'Apr', count: 0 },
                            { month: 'May', count: 2 },
                            { month: 'Jun', count: 1 }
                          ]}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='month' />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey='count' fill='#3b82f6' />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className='mt-2 text-sm text-slate-600'>
                        Total: 9 publications
                      </div>
                    </div>

                    {/* Monthly Growth Chart */}
                    <div className='bg-white rounded-xl border p-4'>
                      <h4 className='text-lg font-semibold text-slate-900 mb-4'>Monthly Growth Rate</h4>
                      <div className='h-48'>
                        <ResponsiveContainer width='100%' height='100%'>
                          <AreaChart data={[
                            { month: 'Jan', growth: 0 },
                            { month: 'Feb', growth: 15 },
                            { month: 'Mar', growth: 8 },
                            { month: 'Apr', growth: -5 },
                            { month: 'May', growth: 12 },
                            { month: 'Jun', growth: 3 }
                          ]}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='month' />
                            <YAxis />
                            <Tooltip />
                            <Area type='monotone' dataKey='growth' stroke='#10b981' fill='#10b981' fillOpacity={0.3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* HCP Intelligence Section */}
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Conferences Attended */}
                    <div className='bg-white rounded-xl border p-4'>
                      <h4 className='text-lg font-semibold text-slate-900 mb-4'>Recent Conferences</h4>
                      <div className='space-y-3'>
                        {analytics?.conferences?.map((conf, i) => (
                          <div key={i} className='border-l-4 border-brand-primary pl-3'>
                            <div className='text-sm font-medium text-slate-900'>{conf.name}</div>
                            <div className='text-xs text-slate-600'>{conf.date}</div>
                            <div className='text-xs text-brand-primary font-medium'>{conf.role}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Job Postings */}
                    <div className='bg-white rounded-xl border p-4'>
                      <h4 className='text-lg font-semibold text-slate-900 mb-4'>Practice Expansion</h4>
                      <div className='space-y-3'>
                        {analytics?.jobPostings?.map((job, i) => (
                          <div key={i} className='flex items-center justify-between'>
                            <div>
                              <div className='text-sm font-medium text-slate-900'>{job.title}</div>
                              <div className='text-xs text-slate-600'>{job.date}</div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                            }`}>
                              {job.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Media Word Cloud */}
                    <div className='bg-white rounded-xl border p-4'>
                      <h4 className='text-lg font-semibold text-slate-900 mb-4'>Social Media Topics</h4>
                      <div className='flex flex-wrap gap-2'>
                        {analytics?.socialMediaKeywords?.map((keyword, i) => (
                          <span
                            key={i}
                            className='px-3 py-1 rounded-full text-xs font-medium'
                            style={{
                              backgroundColor: `${keyword.color}20`,
                              color: keyword.color,
                              fontSize: `${Math.max(10, 12 + keyword.count)}px`
                            }}
                          >
                            {keyword.word} ({keyword.count})
                          </span>
                        ))}
                      </div>
                      <div className='mt-3 text-xs text-slate-600'>
                        Based on LinkedIn, Twitter, and professional blog posts
                      </div>
                    </div>
                  </div>

                  {/* Trend Analysis */}
                  <div className='bg-slate-50 rounded-xl p-4'>
                    <h4 className='text-lg font-semibold text-slate-900 mb-2'>Trend Analysis</h4>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 text-sm'>
                      <div>
                        <span className='font-semibold'>Intermittent Trend:</span> {trendLabel}
                      </div>
                      <div>
                        <span className='font-semibold'>Product Mix:</span> {analytics?.totalVolume ? `${((analytics.totalIntermittent / analytics.totalVolume) * 100).toFixed(1)}% Intermittent` : 'N/A'}
                      </div>
                      <div>
                        <span className='font-semibold'>Growth Rate:</span> {analytics?.monthlyGrowth?.slice(-1)[0]?.growth?.toFixed(1) || 0}% (last month)
                      </div>
                      <div>
                        <span className='font-semibold'>Research Activity:</span> {analytics?.publications?.reduce((sum, p) => sum + p.count, 0) || 0} publications (6 months)
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {tab === 'Trip Notes' && (
            <div className='mt-4 space-y-6'>
              {!notes ? (
                <div className='text-sm text-slate-500'>Loading…</div>
              ) : (
                <>
                  {/* Trip Notes Header */}
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-slate-900'>Trip Notes & Visit History</h3>
                    <button 
                      onClick={() => setShowAddNote(true)}
                      className='px-4 py-2 rounded-lg bg-brand-primary text-white text-sm hover:bg-brand-primary/90 transition-colors'
                    >
                      + Add New Note
                    </button>
                  </div>

                  {/* Trip Notes Analytics */}
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Total Visits</div>
                      <div className='text-2xl font-bold text-slate-900'>{notes.length}</div>
                    </div>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Last Visit</div>
                      <div className='text-lg font-semibold text-slate-900'>{notes[0]?.date || 'N/A'}</div>
                    </div>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Avg Sentiment</div>
                      <div className='text-lg font-semibold text-slate-900'>
                        {notes.filter(n => n.sentiment === 'Positive').length > notes.filter(n => n.sentiment === 'Negative').length ? 'Positive' : 'Neutral'}
                      </div>
                    </div>
                    <div className='bg-slate-50 rounded-xl p-4'>
                      <div className='text-sm text-slate-600'>Follow-ups</div>
                      <div className='text-lg font-semibold text-slate-900'>{notes.filter(n => n.followUp !== 'None').length}</div>
                    </div>
                  </div>

                  <div className='grid md:grid-cols-3 gap-6'>
                    {/* Trip Notes List */}
                    <div className='md:col-span-2 space-y-3'>
                      <h4 className='text-lg font-semibold text-slate-900 mb-4'>Visit History</h4>
                      {notes.map((n, i) => (
                        <div 
                          key={i} 
                          className={`border rounded-xl p-4 bg-white hover:shadow-md transition-shadow cursor-pointer ${
                            selectedNote === i ? 'ring-2 ring-brand-primary bg-brand-light' : ''
                          }`}
                          onClick={() => setSelectedNote(selectedNote === i ? null : i)}
                        >
                          <div className='flex items-start justify-between mb-2'>
                            <div className='text-sm font-medium text-slate-900'>{n.date}</div>
                            <div className='flex items-center gap-2'>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                n.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                                n.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {n.sentiment}
                              </span>
                              {selectedNote === i && (
                                <svg className='w-4 h-4 text-brand-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className='text-sm text-slate-700 mb-2'>{n.summary}</div>
                          <div className='text-xs text-slate-600'>
                            <span className='font-medium'>Follow-up:</span> {n.followUp}
                          </div>
                          
                          {/* Expanded Details */}
                          {selectedNote === i && (
                            <div className='mt-4 pt-4 border-t border-slate-200 space-y-3'>
                              <div>
                                <h5 className='text-sm font-semibold text-slate-900 mb-2'>Detailed Notes</h5>
                                <div className='text-sm text-slate-700 bg-slate-50 rounded-lg p-3'>
                                  {n.detailedNotes || 'Discussed product utilization trends and upcoming needs. Physician showed interest in new CAUTI prevention protocols and requested additional training materials for staff.'}
                                </div>
                              </div>
                              
                              <div className='grid grid-cols-2 gap-4'>
                                <div>
                                  <span className='text-xs font-medium text-slate-600'>Visit Duration:</span>
                                  <div className='text-sm text-slate-900'>45 minutes</div>
                                </div>
                                <div>
                                  <span className='text-xs font-medium text-slate-600'>Attendees:</span>
                                  <div className='text-sm text-slate-900'>Dr. {doc.name}, Nurse Manager</div>
                                </div>
                                <div>
                                  <span className='text-xs font-medium text-slate-600'>Topics Discussed:</span>
                                  <div className='text-sm text-slate-900'>CAUTI Prevention, Product Training</div>
                                </div>
                                <div>
                                  <span className='text-xs font-medium text-slate-600'>Next Steps:</span>
                                  <div className='text-sm text-slate-900'>Schedule follow-up in 2 weeks</div>
                                </div>
                              </div>
                              
                              <div className='flex gap-2'>
                                <button className='px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs hover:bg-slate-200 transition-colors'>
                                  Edit Note
                                </button>
                                <button className='px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs hover:bg-slate-200 transition-colors'>
                                  Export PDF
                                </button>
                                <button className='px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs hover:bg-slate-200 transition-colors'>
                                  Share
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* AI Insights Panel */}
                    <div className='space-y-4'>
                      <h4 className='text-lg font-semibold text-slate-900 mb-4'>AI Insights</h4>
                      
                      {/* LLM Summary */}
                      <div className='bg-brand-light rounded-xl p-4 border border-brand-primary/20'>
                        <div className='text-sm font-semibold text-brand-primary mb-2'>Visit Summary</div>
                        {summary && (
                          <>
                            <div className='text-sm text-slate-700 mb-3'>{summary.summary}</div>
                            <div className='text-sm mb-2'>
                              <span className='font-semibold text-brand-primary'>Next Action:</span>
                            </div>
                            <div className='text-sm text-slate-700 mb-3'>{summary.nextBestAction}</div>
                            <div className='text-xs text-slate-600'>
                              <span className='font-medium'>Talk Track:</span> {summary.talkTrack}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Key Topics */}
                      <div className='bg-white rounded-xl p-4 border'>
                        <div className='text-sm font-semibold text-slate-900 mb-3'>Key Topics</div>
                        <div className='space-y-2'>
                          {['CAUTI Prevention', 'Product Training', 'Clinical Support', 'Pricing Discussion'].map((topic, i) => (
                            <div key={i} className='flex items-center justify-between text-sm'>
                              <span className='text-slate-700'>{topic}</span>
                              <span className='text-xs bg-slate-100 px-2 py-1 rounded-full'>
                                {Math.floor(Math.random() * 5) + 1} mentions
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Engagement Score */}
                      <div className='bg-white rounded-xl p-4 border'>
                        <div className='text-sm font-semibold text-slate-900 mb-3'>Engagement Score</div>
                        <div className='flex items-center gap-3'>
                          <div className='flex-1 bg-slate-200 rounded-full h-2'>
                            <div className='bg-green-500 h-2 rounded-full' style={{ width: '75%' }}></div>
                          </div>
                          <span className='text-sm font-semibold text-slate-900'>75%</span>
                        </div>
                        <div className='text-xs text-slate-600 mt-1'>Based on visit frequency and interactions</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add New Trip Note Modal */}
      {showAddNote && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold text-slate-900'>Add New Trip Note</h2>
                <button 
                  onClick={() => setShowAddNote(false)}
                  className='text-slate-400 hover:text-slate-600 text-2xl'
                >
                  ×
                </button>
              </div>
              
              <form className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Visit Date</label>
                  <input 
                    type='date' 
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Visit Summary</label>
                  <textarea 
                    rows={3}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'
                    placeholder='Brief summary of the visit...'
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Detailed Notes</label>
                  <textarea 
                    rows={5}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'
                    placeholder='Detailed notes about the visit, discussions, and outcomes...'
                  />
                </div>
                
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Sentiment</label>
                    <select className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'>
                      <option value='Positive'>Positive</option>
                      <option value='Neutral'>Neutral</option>
                      <option value='Negative'>Negative</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Follow-up Required</label>
                    <select className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'>
                      <option value='None'>None</option>
                      <option value='Schedule follow-up call'>Schedule follow-up call</option>
                      <option value='Send product samples'>Send product samples</option>
                      <option value='Provide training materials'>Provide training materials</option>
                      <option value='Arrange clinical consultation'>Arrange clinical consultation</option>
                    </select>
                  </div>
                </div>
                
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Visit Duration</label>
                    <input 
                      type='text' 
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'
                      placeholder='e.g., 45 minutes'
                    />
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Attendees</label>
                    <input 
                      type='text' 
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'
                      placeholder='e.g., Dr. Smith, Nurse Manager'
                    />
                  </div>
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Topics Discussed</label>
                  <div className='space-y-2'>
                    {['CAUTI Prevention', 'Product Training', 'Clinical Support', 'Pricing Discussion', 'Quality Metrics'].map((topic) => (
                      <label key={topic} className='flex items-center'>
                        <input type='checkbox' className='rounded border-slate-300 text-brand-primary focus:ring-brand-primary' />
                        <span className='ml-2 text-sm text-slate-700'>{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Next Steps</label>
                  <textarea 
                    rows={2}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary'
                    placeholder='Specific next steps and action items...'
                  />
                </div>
              </form>
              
              <div className='mt-6 flex justify-end gap-3'>
                <button 
                  onClick={() => setShowAddNote(false)}
                  className='px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors'
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Here you would save the new trip note
                    setShowAddNote(false)
                  }}
                  className='px-4 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors'
                >
                  Save Trip Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
