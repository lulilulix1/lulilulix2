import React, { useState } from 'react';
export default function AdminLogin({onSuccess}){
  const [password,setPassword]=useState('');
  const ADMIN_PASS=(process.env.REACT_APP_ADMIN_PASSWORD||'luli123').trim();
  const handle=(e)=>{ e.preventDefault(); if(password===ADMIN_PASS){ localStorage.setItem('isAdmin','1'); if(onSuccess) onSuccess(); } else alert('Fjalëkalim i gabuar'); };
  return (
    <div style={{maxWidth:420,margin:'40px auto',padding:20,background:'#fff',borderRadius:8}}>
      <h3>Hyrje Admin</h3>
      <form onSubmit={handle}>
        <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Fjalëkalimi' style={{width:'100%',padding:8}} />
        <div style={{marginTop:10}}><button type='submit' style={{padding:'8px 12px'}}>Hyr</button></div>
        <div style={{marginTop:10,fontSize:12,color:'#666'}}>Demo password: <strong>luli123</strong></div>
      </form>
    </div>
  );
}
