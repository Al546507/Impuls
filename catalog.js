// Стабильный каталог (картинки локально из /images)
window.CATALOG = [
  { id: 'kirpich-m150', title: 'Кирпич керамический М150', category: 'Кирпич и блоки', priceFrom: 18, unit: '₽ / шт', image: 'kirpich-m150.jpg' },
  { id: 'gazoblok-d500', title: 'Газоблок D500 600×250×200', category: 'Кирпич и блоки', priceFrom: 145, unit: '₽ / шт', image: 'gazoblok-d500.jpg' },
  { id: 'cement-m500', title: 'Цемент М500 (50 кг)', category: 'Сыпучие материалы', priceFrom: 410, unit: '₽ / мешок', image: 'cement-m500.jpg' },
  { id: 'pesok', title: 'Песок карьерный', category: 'Сыпучие материалы', priceFrom: 450, unit: '₽ / т', image: 'pesok.jpg' },
  { id: 'sheben-5-20', title: 'Щебень 5–20', category: 'Сыпучие материалы', priceFrom: 1200, unit: '₽ / т', image: 'sheben-5-20.jpg' },
  { id: 'pk-12x6', title: 'Плита ПК 1.2×6.0', category: 'ЖБИ и плиты', priceFrom: 12900, unit: '₽ / шт', image: 'pk-12x6.jpg' },
  { id: 'fbs-24-4-6', title: 'ФБС 24-4-6', category: 'ЖБИ и плиты', priceFrom: 3350, unit: '₽ / шт', image: 'fbs-24-4-6.jpg' },
  { id: 'profnastil-ns35', title: 'Профнастил НС‑35', category: 'Кровля', priceFrom: 520, unit: '₽ / м²', image: 'profnastil-ns35.jpg' },
  { id: 'minvata-50', title: 'Минвата 50 мм', category: 'Утеплитель', priceFrom: 410, unit: '₽ / м²', image: 'minvata-50.jpg' },
  { id: 'gipsokarton-125', title: 'Гипсокартон 12.5 мм', category: 'Листовые материалы', priceFrom: 420, unit: '₽ / лист', image: 'gkl-125.jpg' },
  { id: 'doska-25x100x6', title: 'Доска обрезная 25×100×6', category: 'Дерево', priceFrom: 4800, unit: '₽ / м³', image: 'doska-25x100x6.jpg' },
  { id: 'kraska-fasad-10', title: 'Краска фасадная 10 л', category: 'Отделочные материалы', priceFrom: 1690, unit: '₽ / шт', image: 'kraska-fasad-10.jpg' }
];

// для селектора категорий
window.CATEGORIES = [...new Set(window.CATALOG.map(i => i.category))];
