/* Простейшая логика каталога и формы без серверной части */
const elGrid = document.getElementById('grid')
const elSearch = document.getElementById('search')
const elCategory = document.getElementById('category')
const elYear = document.getElementById('year')
elYear.textContent = new Date().getFullYear()

function render(items){
  elGrid.innerHTML = ''
  if(!items.length){
    elGrid.innerHTML = '<p class="muted">Ничего не найдено. Измените фильтр.</p>'
    return
  }
  for(const it of items){
    const card = document.createElement('article')
    card.className = 'card'
    card.innerHTML = `
      <img src="${it.image}" data-full="${it.image}" alt="${it.title}">
      <h3>${it.title}</h3>
      <p class="muted">${it.category}</p>
      <p>${it.desc}</p>
      <div class="row"><span class="price">${it.price}</span><span class="muted">MOQ: ${it.moq}</span></div>      <button class="btn" data-sku="${it.id}">Запросить прайс</button>
    `
    elGrid.appendChild(card)
  }
}

function applyFilters(){
  const q = (elSearch.value || '').toLowerCase()
  const cat = elCategory.value
  const filtered = window.CATALOG.filter(it => {
    const matchQ = it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
    const matchC = !cat || it.category === cat
    return matchQ && matchC
  })
  render(filtered)
}

elSearch.addEventListener('input', applyFilters)
elCategory.addEventListener('change', applyFilters)

// Простая имитация отправки формы
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault()
  const form = new FormData(e.target)
  const data = Object.fromEntries(form.entries())
  const msg = document.getElementById('formMsg')
  msg.textContent = 'Спасибо! Мы получили вашу заявку. (На бесплатном хостинге без бэкенда письмо не отправляется)'
  e.target.reset()
  console.log('Lead:', data)
})

render(window.CATALOG)

// Prefill contact form from catalog
elGrid.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-sku]')
  if(!btn) return
  const sku = btn.getAttribute('data-sku')
  const item = window.CATALOG.find(x=>x.id===sku)
  const form = document.getElementById('contactForm')
  if(!form) { alert('Форма контакта не найдена'); return }
  const subj = form.querySelector('input[name="subject"]')
  const msg = form.querySelector('textarea[name="message"]')
  if(subj) subj.value = `Запрос прайса: ${item.id} — ${item.title}`
  if(msg) msg.value = `Здравствуйте! Интересует позиция ${item.id} — ${item.title} (${item.category}).\nКол-во: [укажите] \nДоставка: [город]`

  // Прокрутка к форме
  const contact = document.getElementById('contact')
  if(contact) contact.scrollIntoView({behavior:'smooth'})
})


// --- Lightbox ---
const lightbox = document.createElement('div')
lightbox.className = 'lightbox'
lightbox.innerHTML = '<button class="close" aria-label="Закрыть">Закрыть</button><img alt="Просмотр">'
document.body.appendChild(lightbox)
const lbImg = lightbox.querySelector('img')
lightbox.addEventListener('click', (e)=>{
  if(e.target.classList.contains('close') || e.target===lightbox) lightbox.classList.remove('open')
})

// open on image click
elGrid.addEventListener('click', (e)=>{
  const img = e.target.closest('img[data-full]')
  if(!img) return
  const full = img.getAttribute('data-full') || img.src
  lbImg.src = full
  lightbox.classList.add('open')
})
    