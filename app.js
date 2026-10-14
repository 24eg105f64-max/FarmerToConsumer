const products = [
  {id:1,name:"Fresh Tomatoes",category:"Vegetables",price:35,unit:"per kg",emoji:"🍅"},
  {id:2,name:"Green Spinach",category:"Leafy greens",price:20,unit:"per bunch",emoji:"🥬"},
  {id:3,name:"Sweet Carrots",category:"Vegetables",price:40,unit:"per kg",emoji:"🥕"},
  {id:4,name:"Farm Apples",category:"Fruits",price:120,unit:"per kg",emoji:"🍎"},
  {id:5,name:"Yellow Corn",category:"Vegetables",price:30,unit:"per piece",emoji:"🌽"},
  {id:6,name:"Fresh Broccoli",category:"Vegetables",price:65,unit:"per piece",emoji:"🥦"},
  {id:7,name:"Ripe Bananas",category:"Fruits",price:45,unit:"per dozen",emoji:"🍌"},
  {id:8,name:"Sweet Strawberries",category:"Fruits",price:90,unit:"per box",emoji:"🍓"}
];
const cart = {};
const grid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("cart-total");
const countEl = document.getElementById("cart-count");
const money = n => "₹" + n.toLocaleString("en-IN");

function renderProducts(filter=""){
  const matching = products.filter(p => (p.name+" "+p.category).toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = matching.length ? matching.map(p => `
    <article class="product-card">
      <div class="product-art">${p.emoji}</div>
      <h3>${p.name}</h3><p>${p.category} · ${p.unit}</p>
      <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">Add to cart</button></div>
    </article>`).join("") : "<p>No products found. Try another search.</p>";
}
function renderCart(){
  const entries = products.filter(p => cart[p.id]);
  if(!entries.length){cartItems.innerHTML='<p class="empty">Your cart is empty. Add something fresh!</p>';}
  else {cartItems.innerHTML=entries.map(p=>`
    <div class="cart-row">
      <div><strong>${p.emoji} ${p.name}</strong><br><small>${money(p.price)} × ${cart[p.id]}</small></div>
      <div class="quantity"><button data-change="${p.id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${cart[p.id]}</span><button data-change="${p.id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div>
      <strong>${money(p.price*cart[p.id])}</strong>
    </div>`).join("");}
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const total=products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0);
  countEl.textContent=count; totalEl.textContent=money(total);
}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=Number(b.dataset.add);cart[id]=(cart[id]||0)+1;renderCart();b.textContent="Added ✓";setTimeout(()=>{if(b.isConnected)b.textContent="Add to cart";},700);});
cartItems.addEventListener("click",e=>{const b=e.target.closest("[data-change]");if(!b)return;const id=Number(b.dataset.change);cart[id]=(cart[id]||0)+Number(b.dataset.delta);if(cart[id]<=0)delete cart[id];renderCart();});
document.getElementById("search").addEventListener("input",e=>renderProducts(e.target.value));
document.getElementById("checkout").addEventListener("click",()=>{const count=Object.values(cart).reduce((a,b)=>a+b,0);if(!count){alert("Your cart is empty. Add products before placing an order.");return;}alert("Demo order placed! Total: "+totalEl.textContent+"\nThis prototype does not process real payments.");for(const id of Object.keys(cart))delete cart[id];renderCart();});
renderProducts();renderCart();
