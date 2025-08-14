import React,{useEffect,useRef} from 'react'
import mermaid from 'mermaid'
mermaid.initialize({startOnLoad:false,theme:'default',securityLevel:'strict'})
export default function Mermaid({code}){const ref=useRef(null);useEffect(()=>{let cancelled=false;(async()=>{try{const {svg}=await mermaid.render('mermaid-'+Math.random().toString(36).slice(2),code);if(!cancelled&&ref.current){ref.current.innerHTML=svg}}catch(e){if(ref.current){ref.current.innerHTML='<pre class="text-xs text-red-600">'+String(e)+'</pre>'}}})();return()=>{cancelled=true}},[code]);return <div ref={ref} className='overflow-auto'/>}
