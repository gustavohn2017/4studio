# 🚀 Checklist de Deploy - Railway + Vercel

## ✅ Preparação do Projeto (Concluído)

- [x] Arquivo `.env.example` criado no backend
- [x] Arquivo `railway.json` configurado
- [x] Script `build.sh` criado e configurado
- [x] `settings_prod.py` otimizado para Railway
- [x] Arquivo `.env.example` criado no frontend
- [x] `axios.ts` configurado com variável de ambiente
- [x] Arquivo `vercel.json` criado

---

## 🎯 Passo 1: Deploy do Backend (Railway)

### 1.1 Criar conta no Railway
- [ ] Acesse [railway.app](https://railway.app)
- [ ] Faça login com GitHub
- [ ] Autorize acesso ao repositório

### 1.2 Criar novo projeto
- [ ] Clique em "New Project"
- [ ] Selecione "Deploy from GitHub repo"
- [ ] Escolha o repositório `voicetel` (ou `4studio`)
- [ ] ⚠️ **IMPORTANTE**: Em "Settings" → "Root Directory", configure: `4studio-backend`
- [ ] Salve e aguarde o deploy começar

### 1.3 Adicionar PostgreSQL
- [ ] No projeto, clique em "+ New"
- [ ] Selecione "Database" → "PostgreSQL"
- [ ] Aguarde provisionamento (1-2 minutos)
- [ ] Railway cria automaticamente `DATABASE_URL`

### 1.4 Configurar variáveis de ambiente
Clique em "Variables" e adicione:

```bash
# Obrigatórias
SECRET_KEY=cole-aqui-uma-chave-secreta-forte
DEBUG=False
DJANGO_SETTINGS_MODULE=4studio.settings_prod

# Será preenchida após deploy do frontend
CORS_ALLOWED_ORIGINS=http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000
ALLOWED_HOSTS=.railway.app,.up.railway.app

# Email (opcional - para formulário de contato)
EMAIL_HOST_USER=seu-email@gmail.com
EMAIL_HOST_PASSWORD=sua-senha-de-app-gmail
```

### 1.5 Deploy
- [ ] Railway faz deploy automático
- [ ] Aguarde build (2-5 minutos)
- [ ] Verifique logs: deve aparecer "✅ Build completed successfully!"
- [ ] Copie a URL do backend: `https://seu-projeto.up.railway.app`

### 1.6 Testar backend
- [ ] Acesse: `https://seu-projeto.up.railway.app/api/health/`
- [ ] Deve retornar: `{"status": "healthy"}`

---

## 🎨 Passo 2: Deploy do Frontend (Vercel)

### 2.1 Criar conta no Vercel
- [ ] Acesse [vercel.com](https://vercel.com)
- [ ] Faça login com GitHub
- [ ] Autorize acesso ao repositório

### 2.2 Importar projeto
- [ ] Clique em "Add New" → "Project"
- [ ] Selecione o repositório `voicetel`
- [ ] Configure:
  - **Framework Preset**: Next.js
  - **Root Directory**: `4studio-frontend`
  - **Build Command**: `npm run build`
  - **Output Directory**: `.next`

### 2.3 Configurar variáveis de ambiente
Na seção "Environment Variables", adicione:

```bash
NEXT_PUBLIC_API_URL=https://seu-projeto.up.railway.app/api
```

⚠️ **IMPORTANTE**: Substitua `seu-projeto.up.railway.app` pela URL real do Railway!

### 2.4 Deploy
- [ ] Clique em "Deploy"
- [ ] Aguarde build (2-3 minutos)
- [ ] Vercel gera URL automática: `https://seu-app.vercel.app`

### 2.5 Testar frontend
- [ ] Acesse: `https://seu-app.vercel.app`
- [ ] Navegue pelo site
- [ ] Teste formulário de contato

---

## 🔗 Passo 3: Conectar Frontend e Backend

### 3.1 Atualizar CORS no Railway
Volte ao Railway → Variables e atualize:

```bash
CORS_ALLOWED_ORIGINS=https://seu-app.vercel.app,https://seu-app-git-main.vercel.app
CSRF_TRUSTED_ORIGINS=https://seu-app.vercel.app,https://seu-app-git-main.vercel.app
ALLOWED_HOSTS=.railway.app,.up.railway.app,.vercel.app
```

### 3.2 Redeploy backend
- [ ] Railway faz redeploy automático após salvar variáveis
- [ ] Aguarde 1-2 minutos

### 3.3 Testar integração
- [ ] Acesse o frontend no Vercel
- [ ] Teste o formulário de contato
- [ ] Verifique se dados chegam ao backend

---

## 🌐 Passo 4: Domínio Personalizado (Opcional)

### 4.1 Configurar domínio no Vercel
- [ ] Em Vercel → Settings → Domains
- [ ] Adicione: `www.seudominio.com.br` e `seudominio.com.br`
- [ ] Siga instruções de DNS

### 4.2 Configurar subdomínio no Railway
- [ ] Em Railway → Settings → Domains
- [ ] Adicione: `api.seudominio.com.br`
- [ ] Configure CNAME no DNS

### 4.3 Atualizar variáveis
**Railway:**
```bash
ALLOWED_HOSTS=.railway.app,.up.railway.app,api.seudominio.com.br
CORS_ALLOWED_ORIGINS=https://seudominio.com.br,https://www.seudominio.com.br
CSRF_TRUSTED_ORIGINS=https://seudominio.com.br,https://www.seudominio.com.br
```

**Vercel:**
```bash
NEXT_PUBLIC_API_URL=https://api.seudominio.com.br/api
```

---

## 🧪 Passo 5: Testes Finais

- [ ] ✅ Frontend carrega corretamente
- [ ] ✅ Formulário de contato funciona
- [ ] ✅ Imagens carregam
- [ ] ✅ Navegação funciona
- [ ] ✅ SSL/HTTPS ativo (cadeado verde)
- [ ] ✅ Performance aceitável (< 3s carregamento)

---

## 📊 Monitoramento

### Railway (Backend)
- Logs: `railway.app/project/seu-projeto/logs`
- Métricas: CPU, RAM, Network
- Database: Queries, tamanho

### Vercel (Frontend)
- Analytics: `vercel.com/seu-projeto/analytics`
- Logs: `vercel.com/seu-projeto/logs`
- Performance: Core Web Vitals

---

## 🆘 Troubleshooting

### Erro "502 Bad Gateway" no backend
- Verifique logs no Railway
- Confirme que `DATABASE_URL` está configurada
- Verifique se migrations rodaram: `python manage.py showmigrations`

### Erro "CORS" no frontend
- Verifique `CORS_ALLOWED_ORIGINS` no Railway
- Confirme que incluiu todas as URLs do Vercel
- Limpe cache do navegador (Ctrl+Shift+R)

### Build falhou
- **Backend**: Verifique logs no Railway, geralmente erro em `requirements.txt`
- **Frontend**: Verifique logs no Vercel, geralmente erro em `package.json` ou código

### Formulário não envia
- Teste endpoint diretamente: `https://backend.railway.app/api/contact-requests/`
- Verifique console do navegador (F12)
- Confirme `NEXT_PUBLIC_API_URL` no Vercel

---

## 🎉 Deploy Completo!

Seu projeto está no ar em:
- 🎨 **Frontend**: `https://seu-app.vercel.app`
- 🔧 **Backend**: `https://seu-projeto.up.railway.app`
- 📊 **Admin**: `https://seu-projeto.up.railway.app/admin/`

**Tempo total estimado**: 15-20 minutos ⚡

---

## 📝 Próximos Passos

1. Configure domínio personalizado
2. Configure email para formulário de contato
3. Adicione Google Analytics (opcional)
4. Configure backup do banco de dados
5. Documente APIs no Swagger/OpenAPI

---

## 💰 Custos Mensais

| Serviço | Custo |
|---------|-------|
| Railway (Hobby) | $5 USD (~R$25) |
| Vercel (Hobby) | $0 (grátis) |
| **Total** | **~R$25/mês** |

**Planos pagos disponíveis para escalar conforme necessário.**
