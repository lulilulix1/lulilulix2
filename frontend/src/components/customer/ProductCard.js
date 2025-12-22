import React from 'react';
export default function ProductCard({product, onAddToCart}){
  return (
    <div style={{border:'1px solid #eee',padding:12,borderRadius:8}}>
      <div style={{height:160,background:'#f8f9fa',display:'flex',alignItems:'center',justifyContent:'center'}}>{product.imageUrl ? <img src={product.imageUrl} alt='' style={{maxHeight:'100%',maxWidth:'100%'}}/> : '🛋️'}</div>
      <h4>{product.name}</h4>
      <div style={{color:'#27ae60',fontWeight:'bold'}}>{product.price.toFixed(2)}€</div>
      <p style={{fontSize:13,color:'#666'}}>{product.description}</p>
      <button onClick={()=> onAddToCart(product)}>Shto në Shportë</button>
    </div>
  );
}
