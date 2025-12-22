const KEY_PRODUCTS = 'orendion_products';
const KEY_ORDERS = 'orendion_orders';
export function loadProducts(){ try{return JSON.parse(localStorage.getItem(KEY_PRODUCTS)||'[]');}catch(e){return []} }
export function saveProducts(list){ localStorage.setItem(KEY_PRODUCTS, JSON.stringify(list)); }
export function loadOrders(){ try{return JSON.parse(localStorage.getItem(KEY_ORDERS)||'[]');}catch(e){return []} }
export function saveOrders(list){ localStorage.setItem(KEY_ORDERS, JSON.stringify(list)); }
