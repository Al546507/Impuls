// === Утилита: заглушка-картинка если не загрузилось ===
function fallbackSVG(text="Фото скоро будет"){
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
    <rect width="100%" height="100%" fill="#f3f5f9"/>
    <text x="50%" y="50%" text-anchor="middle" fill="#9aa3af" font-size="20" font-family="Inter,Arial"> ${text} </text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// === Рендер карточек ===
const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const items = window.APP_CATALOG || [];

function render(itemsList){
  grid.innerHTML = '';
  if(!itemsList.length){
    grid.innerHTML = `<div class="card"><p class="muted">Каталог временно пуст.</p></div>`;
    return;
  }
  itemsList.forEach((it, idx) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'thumb';
    img.alt = it.name;
    img.loading = 'lazy';
    img.src = it.image;
    img.onerror = () => { img.src = fallbackSVG("Нет фото"); };

    const title = document.createElement('h3'); title.textContent = it.name;
    const cat   = document.createElement('p');  cat.className='muted'; cat.textContent = it.category;
    const price = document.createElement('p');  price.className='price'; price.textContent = it.price;

    const row = document.createElement('div'); row.className='row';
    const buy = document.createElement('button'); buy.className='btn primary'; buy.textContent='Купить';
    buy.onclick = () => addToCart(idx);

    row.appendChild(buy);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(cat);
    card.appendChild(price);
    card.appendChild(row);

    grid.appendChild(card);
  });
}

function applyFilters(){
  const q = (searchInput.value || '').toLowerCase();
  const c = categorySelect.value || '';
  const filtered = items.filter(it => {
    const okQ = it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
    const okC = !c || it.category === c;
    return okQ && okC;
  });
  render(filtered);
}

// === Корзина ===
const drawer = document.getElementById('cartDrawer');
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');

let cart = JSON.parse(localStorage.getItem('impuls_cart') || '[]');

function saveCart(){ localStorage.setItem('impuls_cart', JSON.stringify(cart)); }
function cartCount(){ return cart.reduce((s,i)=>s+i.qty,0); }
function cartTotal(){ return cart.reduce((s,i)=>s+i.qty*(i.priceNum||0),0); }
function parsePrice(p){ // "от 410 ₽ / мешок" -> 410
  const m = (p||'').match(/(\d[\d\s]*)/);
  return m ? Number(m[1].replace(/\s+/g,'')) : 0;
}

function addToCart(idx){
  const item = items[idx];
  const priceNum = parsePrice(item.price);
  const found = cart.find(c => c.name === item.name);
  if(found){ found.qty++; }
  else { cart.push({ name:item.name, price:item.price, priceNum, image:item.image, qty:1 }); }
  saveCart();
  updateCartUI();
  openDrawer();
}

function changeQty(name, delta){
  const it = cart.find(i => i.name === name);
  if(!it) return;
  it.qty += delta;
  if(it.qty <= 0) cart = cart.filter(i => i.name !== name);
  saveCart();
  updateCartUI();
}

function removeItem(name){
  cart = cart.filter(i => i.name !== name);
  saveCart();
  updateCartUI();
}

function updateCartUI(){
  cartItemsEl.innerHTML = '';
  if(!cart.length){
    cartItemsEl.innerHTML = `<p class="muted">В корзине пусто.</p>`;
  } else {
    cart.forEach(it=>{
      const row = document.createElement('div');
      row.className='cart-item';
      row.innerHTML = `
        <img src="${it.image}" onerror="this.src='${fallbackSVG("Нет фото")}';" alt="">
        <div>
          <div><strong>${it.name}</strong></div>
          <div class="muted small">${it.price}</div>
          <div class="qty mt">
            <button onclick="changeQty('${it.name.replace(/'/g,"\\'")}',-1)">−</button>
            <span>${it.qty}</span>
            <button onclick="changeQty('${it.name.replace(/'/g,"\\'")}',+1)">+</button>
            <button class="icon-btn" style="margin-left:8px" onclick="removeItem('${it.name.replace(/'/g,"\\'")}')">Удалить</button>
          </div>
        </div>
        <div><strong>${(it.priceNum*it.qty).toLocaleString('ru-RU')} ₽</strong></div>
      `;
      cartItemsEl.appendChild(row);
    });
  }
  cartTotalEl.textContent = `${cartTotal().toLocaleString('ru-RU')} ₽`;
  cartCountEl.textContent = cartCount();
}
window.changeQty = changeQty;   // чтобы работало из html innerHTML
window.removeItem = removeItem; // чтобы работало из html innerHTML

function openDrawer(){ drawer.classList.add('open'); }
function closeDrawer(){ drawer.classList.remove('open'); }

openCartBtn.onclick = openDrawer;
closeCartBtn.onclick = closeDrawer;

// === Оформление заказа (mailto) ===
const orderModal = document.getElementById('orderModal');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeOrder = document.getElementById('closeOrder');
const orderForm  = document.getElementById('orderForm');

function openOrder(){ orderModal.classList.add('show'); }
function closeOrderFn(){ orderModal.classList.remove('show'); }
checkoutBtn.onclick = () => {
  if(!cart.length){ alert('Корзина пуста'); return; }
  openOrder();
};
closeOrder.onclick = closeOrderFn;
orderModal.addEventListener('click', (e)=>{ if(e.target===orderModal) closeOrderFn(); });

orderForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(orderForm);
  const name = fd.get('name');
  const phone = fd.get('phone');
  const comment = fd.get('comment') || '';

  const lines = cart.map(i=>`${i.name} — ${i.qty} шт • ${i.price} (сумма: ${(i.qty*i.priceNum).toLocaleString('ru-RU')} ₽)`);
  const total = cartTotal().toLocaleString('ru-RU');

  const body =
`Имя: ${name}
Телефон: ${phone}
Комментарий: ${comment}

Товары:
${lines.join('\n')}

Итого: ${total} ₽
`;

  const subject = encodeURIComponent('Заказ со страницы ООО «Импульс»');
  const mail = window.ORDER_EMAIL || 'alex546507@gmail.com';
  const mailto = `mailto:${encodeURIComponent(mail)}?subject=${subject}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  closeOrderFn();
});

// === Инициализация ===
document.addEventListener('DOMContentLoaded', ()=>{
  // подготовить числовые цены для всех товаров один раз
  items.forEach(it => it.priceNum = parsePrice(it.price));
  render(items);
  updateCartUI();

  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
});
