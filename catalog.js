// Каталог (иконки рисуются вектором, см. iconSvg в script.js)
const catalog = [
  { id: 'brick',    name: 'Кирпич керамический М150',       category: 'Кирпич и блоки',        price: 18,    unit: '₽ / шт',      icon: 'brick' },
  { id: 'aerated',  name: 'Газоблок D500 600×250×200',      category: 'Кирпич и блоки',        price: 145,   unit: '₽ / шт',      icon: 'aerated' },
  { id: 'cement',   name: 'Цемент М500 (50 кг)',            category: 'Сыпучие материалы',     price: 410,   unit: '₽ / мешок',   icon: 'cement' },
  { id: 'sand',     name: 'Песок карьерный',                category: 'Сыпучие материалы',     price: 450,   unit: '₽ / т',       icon: 'sand' },
  { id: 'gravel',   name: 'Щебень 5–20',                    category: 'Сыпучие материалы',     price: 1200,  unit: '₽ / т',       icon: 'gravel' },
  { id: 'slab',     name: 'Плита ПК 1.2×6.0',               category: 'ЖБИ и плиты',           price: 12900, unit: '₽ / шт',      icon: 'slab' },
  { id: 'fbs',      name: 'ФБС 24‑4‑6',                      category: 'ЖБИ и плиты',           price: 3350,  unit: '₽ / шт',      icon: 'fbs' },
  { id: 'roof',     name: 'Профнастил НС‑35',               category: 'Кровля',                price: 520,   unit: '₽ / м²',      icon: 'roof' },
  { id: 'wool',     name: 'Минвата 50 мм',                  category: 'Утеплитель',            price: 410,   unit: '₽ / м²',      icon: 'wool' },
  { id: 'drywall',  name: 'Гипсокартон 12.5 мм',            category: 'Листовые материалы',    price: 520,   unit: '₽ / лист',    icon: 'drywall' },
  { id: 'wood',     name: 'Доска обрезная 25×100×6',        category: 'Дерево и пиломатериалы',price: 14500, unit: '₽ / м³',      icon: 'wood' },
  { id: 'paint',    name: 'Краска фасадная 10 л',           category: 'Отделочные материалы',  price: 1950,  unit: '₽ / ведро',   icon: 'paint' },
];
