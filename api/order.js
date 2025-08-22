// api/order.js
import nodemailer from 'nodemailer';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });

  try{
    const { customer, cart, total, site } = req.body || {};
    if(!cart || !cart.length) return res.status(400).json({ ok:false, error:'Cart empty' });

    // SMTP настраиваем через переменные окружения Vercel
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ORDER_EMAIL
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const lines = cart.map(i=>`• ${i.title} — ${i.qty} шт (от ${i.priceFrom} ${i.unit})`).join('\n');
    const htmlLines = cart.map(i=>`<li>${i.title} — <b>${i.qty}</b> шт <i>(от ${i.priceFrom} ${i.unit})</i></li>`).join('');

    const subject = `Заказ с сайта ИМПУЛЬС — ${new Date().toLocaleString('ru-RU')}`;
    const text = [
      `Сайт: ${site}`,
      `Имя: ${customer.name || ''}`,
      `Телефон: ${customer.phone || ''}`,
      `Email: ${customer.email || ''}`,
      `Комментарий: ${customer.comment || ''}`,
      '',
      'Заказ:',
      lines,
      '',
      `Итого: ${total} ₽`
    ].join('\n');

    const html = `
      <div>
        <p><b>Сайт:</b> ${site}</p>
        <p><b>Имя:</b> ${customer.name || ''}</p>
        <p><b>Телефон:</b> ${customer.phone || ''}</p>
        <p><b>Email:</b> ${customer.email || ''}</p>
        <p><b>Комментарий:</b> ${customer.comment || ''}</p>
        <hr/>
        <p><b>Заказ:</b></p>
        <ul>${htmlLines}</ul>
        <p><b>Итого:</b> ${total.toLocaleString('ru-RU')} ₽</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Импульс сайт" <${process.env.SMTP_USER}>`,
      to: process.env.ORDER_EMAIL, // куда отправляем
      subject, text, html
    });

    res.status(200).json({ ok:true });
  }catch(e){
    console.error(e);
    res.status(500).json({ ok:false, error:String(e) });
  }
}
