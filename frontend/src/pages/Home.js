import React from 'react';
import ProductList from '../components/customer/ProductList';
import Header from '../components/customer/Header';
import Footer from '../components/customer/Footer';
export default function Home(){ 
  return (
    <div>
      <Header />
      <main style={{padding:20}}>
        <h1>Orendion - Mobilje & Orendi Shtëpiake</h1>
        <ProductList/>
      </main>
      <Footer/>
    </div>
  );
}
