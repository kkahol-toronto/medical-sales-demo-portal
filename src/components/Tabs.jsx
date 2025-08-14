import React from 'react'
export default function Tabs({tabs,active,onChange}){return <div className='border-b flex gap-2'>{tabs.map(t=>(<button key={t} onClick={()=>onChange(t)} className={`px-3 py-2 text-sm font-semibold border-b-2 ${active===t?'border-brand-primary text-brand-primary':'border-transparent text-slate-600 hover:text-slate-900'}`}>{t}</button>))}</div>}
