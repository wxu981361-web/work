const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const orders = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'shitanian-grass-shop' }));
app.get('/api/orders', (_req, res) => res.json(orders));
app.post('/api/orders', (req, res) => {
  if (!req.body || !Array.isArray(req.body.items) || req.body.items.length === 0) return res.status(400).json({ error: '訂單至少需要一項商品。' });
  const order = { id: `SG${Date.now().toString().slice(-8)}`, createdAt: new Date().toISOString(), customer: req.body.customer || { name: '體驗顧客', phone: '未提供' }, payment: req.body.payment || '信用卡', items: req.body.items, shipping: req.body.shipping || [], total: Number(req.body.total) || 0, status: { paid: false, lineNotified: false, shipped: false } };
  orders.unshift(order);
  res.status(201).json(order);
});
app.patch('/api/orders/:id/status', (req, res) => {
  const order = orders.find(item => item.id === req.params.id);
  if (!order) return res.status(404).json({ error: '找不到訂單。' });
  const { field, value } = req.body || {};
  if (!['paid', 'lineNotified', 'shipped'].includes(field)) return res.status(400).json({ error: '不支援的狀態欄位。' });
  order.status[field] = Boolean(value);
  res.json(order);
});
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(port, '0.0.0.0', () => console.log(`Shitanian grass shop listening on ${port}`));
