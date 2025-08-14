import React from 'react'
import { freshnessBadge } from '../lib/score'
export function Badge({children,tone='bg-slate-100 text-slate-700 border border-slate-200'}){return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tone}`}>{children}</span>}
export function Pill({active=true, children, signalType}) {
  const signalLabels = {
    'A': 'Evidence-based practice',
    'B': 'Volume/Setting optimization',
    'C': 'Environmental factors',
    'D': 'Relationship strength',
    'E': 'Engagement level',
    'F': 'Fit/Coverage alignment'
  }
  
  const tooltipText = signalLabels[children] || children
  
  return (
    <span 
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${active?'bg-brand-primary text-white':'bg-slate-200 text-slate-700'}`}
      title={tooltipText}
    >
      {children}
    </span>
  )
}

export function ScoreBar({score}) {
  const pct = Math.max(0, Math.min(100, score))
  
  // Color scheme based on score ranges
  let barColor = 'bg-pink-500' // Default for low scores
  if (pct >= 80) {
    barColor = 'bg-green-500' // Green for high scores
  } else if (pct >= 60) {
    barColor = 'bg-yellow-500' // Yellow for medium scores
  }
  
  return (
    <div className='w-full h-3 bg-slate-200 rounded-full overflow-hidden'>
      <div className={`${barColor} h-full`} style={{width:`${pct}%`}} />
    </div>
  )
}
export function ProvenanceRow({label,source,updated}){const badge=freshnessBadge(updated);return <div className='flex items-center justify-between text-sm py-1'><div className='text-slate-600'><span className='font-medium'>{label}:</span> {source}</div><Badge tone={badge.tone}>Updated {badge.label}</Badge></div>}
