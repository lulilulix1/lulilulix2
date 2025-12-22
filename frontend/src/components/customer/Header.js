import React from 'react';
import ShoppingCart from './ShoppingCart';
export default function Header(){
  return (
    <header style={{background:'#28a745',color:'white',padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><strong>Orendion</strong> - Mobilje</div>
      <nav><a href='/' style={{color:'white',marginRight:12}}>Dyqan</a><a href='/admin' style={{color:'white',marginRight:12}}>Admin</a></nav>
      <ShoppingCart/>
    </header>
  );
}
