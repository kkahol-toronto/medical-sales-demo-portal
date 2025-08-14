import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts'
import { WEIGHTS, FACTOR_LABELS } from '../lib/score'
export default function ScoreChart({factors}){const data=['A','B','C','D','E','F'].map(k=>({factor:`${k} ${FACTOR_LABELS[k]}`,pts:Math.round((WEIGHTS[k]*(factors[k]??0))*1000)/10,cap:Math.round(WEIGHTS[k]*100)}));return <div className='h-56'><ResponsiveContainer width='100%' height='100%'><BarChart data={data}><XAxis dataKey='factor' tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip formatter={v=>[`${v} pts`,'Contribution']}/><Bar dataKey='pts'><LabelList dataKey='pts' position='top'/></Bar></BarChart></ResponsiveContainer></div>}
