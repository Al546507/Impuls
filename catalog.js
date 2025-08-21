// Каталог товаров + нормальные фото (Unsplash, фиксированный размер 800x600)
const catalog = [
  { name: "Кирпич керамический М150", category: "Кирпич и блоки",      price: "от 18 ₽ / шт",     image: "https://images.unsplash.com/photo-1523419409543-21c1bb1a2b48?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Газоблок D500 600×250×200", category: "Кирпич и блоки",      price: "от 145 ₽ / шт",    image: "https://images.unsplash.com/photo-1601972599720-36938d4f7b06?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Цемент М500 (50 кг)",       category: "Сыпучие материалы",   price: "от 410 ₽ / мешок", image: "https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Песок карьерный",           category: "Сыпучие материалы",   price: "от 450 ₽ / т",     image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Щебень 5–20",               category: "Сыпучие материалы",   price: "от 1 200 ₽ / т",   image: "https://images.unsplash.com/photo-1620656854131-0c2a3d45d268?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Плита ПК 1.2×6.0",          category: "ЖБИ и плиты",         price: "от 12 900 ₽ / шт", image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "ФБС 24-4-6",                category: "ЖБИ и плиты",         price: "от 3 350 ₽ / шт",  image: "https://images.unsplash.com/photo-1541889484988-d0447e91e723?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Профнастил НС-35",          category: "Кровля",              price: "от 520 ₽ / м²",     image: "https://images.unsplash.com/photo-1600674853786-1b4b6b9a1a3b?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Минвата 50 мм",             category: "Утеплитель",          price: "от 410 ₽ / м²",     image: "https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Гипсокартон 12.5 мм",       category: "Листовые материалы",  price: "от 520 ₽ / лист",   image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Доска обрезная 25×100×6",   category: "Дерево и пиломатериалы", price: "от 14 500 ₽ / м³", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&h=600&q=70" },
  { name: "Краска фасадная 10 л",      category: "Отделочные материалы",  price: "от 1 950 ₽ / ведро", image: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&w=800&h=600&q=70" },
];

window.APP_CATALOG = catalog;
