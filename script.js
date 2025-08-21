// Контакты менеджера (используются для письма)
const ORDER_EMAIL = "alex546507@gmail.com";
const ORDER_PHONE = "+7 (993) 264-84-00";

// SVG-заглушка (на случай отказа картинки)
const PLACEHOLDER = (() => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
    <rect width="100%" height="100%" fill="#f1f3f5"/>
    <text x="50%" y="50%" text-anchor="middle" fill="#9aa0a6" font-family="Inter, Arial, sans-serif" font-size="16">фото будет позже</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
})();

function el(tag, cls) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
}

function renderCatalog(items) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  if (!items || !items.length) {
    grid.innerHTML = `<p class="muted">Каталог временно пуст.</p>`;
    return;
  }

  items.forEach((it) => {
    const card = el("article", "card");

    const img = el("img");
    img.src = it.image;
    img.alt = it.name;
    img.loading = "lazy";
    img.width = 400;
    img.height = 300;
    img.onerror = () => (img.src = PLACEHOLDER);

    const h3 = el("h3"); h3.textContent = it.name;
    const cat = el("p", "muted"); cat.textContent = it.category;

    const price = el("div", "row between");
    price.innerHTML = `<strong>${it.price}</strong>`;

    const btn = el("button", "btn small");
    btn.textContent = "Купить";
    btn.addEventListener("click", () => openOrderModal(it));

    card.append(img, h3, cat, price, btn);
    grid.append(card);
  });
}

function applyFilters() {
  const q = (document.getElementById("search").value || "").toLowerCase();
  const cat = document.getElementById("category").value;

  const filtered = catalog.filter((i) => {
    const okCat = !cat || i.category === cat;
    const okText = !q || i.name.toLowerCase().includes(q);
    return okCat && okText;
  });

  renderCatalog(filtered);
}

// --- Модалка заказа ---
const modal = document.getElementById("orderModal");
const closeOrder = document.getElementById("closeOrder");
const orderForm = document.getElementById("orderForm");
const itemNameHidden = document.getElementById("itemName");

function openOrderModal(item) {
  itemNameHidden.value = item.name;
  modal.hidden = false;
}

function closeOrderModal() {
  modal.hidden = true;
  orderForm.reset();
}

closeOrder.addEventListener("click", closeOrderModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeOrderModal();
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const item = itemNameHidden.value;

  // Формируем письмо
  const subject = encodeURIComponent(`Заказ с сайта — ${item}`);
  const body = encodeURIComponent(
    `Товар: ${item}\nИмя: ${name}\nТелефон: ${phone}\nКомментарий: ${comment}\n\nСвязаться: ${ORDER_PHONE}`
  );

  // Открываем почтовый клиент
  window.location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
  closeOrderModal();
  alert("Заявка сформирована. Письмо откроется в вашем почтовом клиенте.");
});

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog(catalog);
  document.getElementById("search").addEventListener("input", applyFilters);
  document.getElementById("category").addEventListener("change", applyFilters);
});
