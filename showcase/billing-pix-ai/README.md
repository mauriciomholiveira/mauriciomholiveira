# Billing PIX + IA (Demo)

Exemplo educativo de backend de cobrança com PIX (webhooks mockados) e detecção simples de risco (baseline). Ideal para demonstrar domínio de integrações e arquitetura.

> Aviso: projeto didático. Não use em produção sem auditoria.

## Recursos
- CRUD de cobranças e clientes (em memória)
- Webhook de pagamento (mock) + atualização de status
- Score de risco (baseline) por atraso/valor/recência
- Estrutura para gateways reais (ex.: Mercado Pago, Gerencianet)

## Rodar local
```bash
cd showcase/billing-pix-ai
npm install
npm start
```

Endpoints:
- POST /api/customers
- POST /api/invoices
- POST /api/webhook/pix
- GET  /api/invoices

## CTA
- WhatsApp: https://api.whatsapp.com/send?phone=5548988080213&text=Quero%20um%20sistema%20de%20cobran%C3%A7a%20com%20PIX
- Email: mailto:mauriciomholiveira@icloud.com

---

© 2025 Mauricio Oliveira • Serviços: Sistemas, Integrações, Automações