// api/order.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { customer, cart, total } = req.body || {};
    if (!cart || !cart.length) {
      return res.status(400).json({ ok: false, error: 'Cart empty' });
    }

    console.log('Новый заказ:', { customer, cart, total });

    // Возвращаем успешный ответ (без отправки)
    res.status(200).json({ ok: true, message: 'Заказ сохранён (тестовый режим)' });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
