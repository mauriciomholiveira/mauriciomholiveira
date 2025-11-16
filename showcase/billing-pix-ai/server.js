import express from 'express';

const app = express();
app.use(express.json());

const db = { customers: [], invoices: [], events: [] };

app.post('/api/customers', (req, res) => {
  const id = 'c_' + (db.customers.length+1);
  const customer = { id, ...req.body };
  db.customers.push(customer);
  res.status(201).json(customer);
});

app.post('/api/invoices', (req, res) => {
  const id = 'i_' + (db.invoices.length+1);
  const invoice = { id, status: 'pending', createdAt: new Date().toISOString(), ...req.body };
  db.invoices.push(invoice);
  res.status(201).json(invoice);
});

// Webhook PIX (mock): atualiza fatura p/ paid
app.post('/api/webhook/pix', (req, res) => {
  const { invoiceId, amount } = req.body;
  const inv = db.invoices.find(i => i.id === invoiceId);
  if (!inv) return res.status(404).json({ error: 'invoice not found' });
  inv.status = 'paid';
  inv.paidAt = new Date().toISOString();
  db.events.push({ type: 'pix.paid', invoiceId, amount, at: new Date().toISOString() });
  res.json({ ok: true });
});

app.get('/api/invoices', (req, res) => {
  res.json(db.invoices);
});

// Score de risco simples
app.get('/api/risk/:invoiceId', (req, res) => {
  const inv = db.invoices.find(i => i.id === req.params.invoiceId);
  if (!inv) return res.status(404).json({ error: 'invoice not found' });
  const value = inv.amount || 0;
  const ageDays = (Date.now() - Date.parse(inv.createdAt)) / 86400000;
  const risk = Math.min(100, Math.round(value/100 + ageDays*2));
  res.json({ invoiceId: inv.id, risk });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Billing PIX demo running on :${port}`));
