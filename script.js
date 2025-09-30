// Shared script: products data, cart management, and helpers
const sampleProducts = [
  {id:1,title:"Men'Shoe",price:59.99,cat:'men',img:'man shoe.jpg',desc:'Durable men sports shoe perfect for daily runs.'},
  {id:2,title:"Women's  Shoe",price:49.99,cat:'women',women shoe.jpg',desc:'Comfortable casual shoe for women.'},
  {id:3,title:"School Shoes",price:39.99,cat:'kids',img:'school shoe.jpg',desc:'Sturdy and affordable school shoes for kids.'}
];

const CART_KEY = 'bata_cart_v1';

function getCart(){return JSON.parse(localStorage.getItem(CART_KEY) || '[]');}
function saveCart(c){localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount();}
function addToCart(id, qty=1){
  const cart=getCart();
  const item = cart.find(i=>i.id===id);
  if(item) item.qty += qty; else cart.push({id, qty});
  saveCart(cart);
  return cart;
}
function updateCartCount(){
  const c = getCart().reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('.cart-count').forEach(el=>el.textContent = c);
}
function findProduct(id){ return sampleProducts.find(p=>p.id===Number(id)); }

// Init on pages
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartCount();

  // Wire up add-to-cart buttons (on lists)
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = Number(btn.dataset.id);
      addToCart(id,1);
      btn.textContent='Added ✓';
      btn.disabled = true;
      setTimeout(()=>{btn.textContent='Add to cart'; btn.disabled=false;},900);
    });
  });

  // Search modal (if exists)
  const searchBtn = document.getElementById('open-search');
  if(searchBtn){
    const modal = document.getElementById('search-modal');
    searchBtn.addEventListener('click', ()=>modal.style.display='flex');
    document.getElementById('close-search').addEventListener('click', ()=>modal.style.display='none');
    document.getElementById('search-input')?.addEventListener('input', (e)=>{
      const q=e.target.value.toLowerCase();
      const results = sampleProducts.filter(p=>p.title.toLowerCase().includes(q));
      const out = document.getElementById('search-results');
      if(!out) return;
      out.innerHTML = results.length ? results.map(r=>`<div style="display:flex;gap:10px;padding:8px;align-items:center"><img src="${jpg}" style="width:60px;height:50px;object-fit:cover;border-radius:6px"><div><strong>${r.title}</strong><div class="small">$${r.price}</div><div style="margin-top:6px"><a href="product.html?id=${r.id}" class="btn">View</a></div></div></div>`).join('<hr>') : '<div style="padding:10px">No results</div>';
    });
  }
});
