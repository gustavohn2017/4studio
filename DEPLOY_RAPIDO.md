# 🚀 Deploy Rápido - Instruções Passo a Passo

## ⚡ Deploy Rápido com Railway + Vercel (15 minutos)

### PARTE 1: Backend no Railway (5 min)

1. **Acesse Railway**
   - https://railway.app
   - Login com GitHub

2. **Criar Projeto**
   - Click "New Project"
   - "Deploy from GitHub repo"
   - Selecione `4studio`

3. **Adicionar PostgreSQL**
   - Click "+ New"
   - "Database" → "PostgreSQL"
   - Railway cria automaticamente `DATABASE_URL`

4. **Configurar Variáveis** (aba Variables)
   ```
   DJANGO_SETTINGS_MODULE=4studio.settings_prod
   SECRET_KEY=[gerar nova chave - veja abaixo]
   ALLOWED_HOSTS=seu-app.railway.app
   FRONTEND_URL=https://seu-app.vercel.app
   DEBUG=False
   ```

   **Gerar SECRET_KEY**:
   ```bash
   python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
   ```

5. **Deploy**
   - Railway faz deploy automaticamente
   - Aguarde conclusão (~2-3 min)
   - Copie a URL: `https://seu-app.railway.app`

6. **Criar Superusuário** (opcional)
   - Aba "Deploy Logs"
   - Click "Shell"
   - Execute: `python manage.py createsuperuser`

### PARTE 2: Frontend no Vercel (5 min)

1. **Acesse Vercel**
   - https://vercel.com
   - Login com GitHub

2. **Importar Projeto**
   - Click "Add New..." → "Project"
   - Selecione `4studio`
   - **Root Directory**: `4studio-frontend`
   - **Framework Preset**: Next.js (auto-detectado)

3. **Configurar Variável de Ambiente**
   - Antes de deploy, click "Environment Variables"
   - Adicione:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://seu-app.railway.app/api
     ```

4. **Deploy**
   - Click "Deploy"
   - Aguarde conclusão (~2-3 min)
   - Copie a URL: `https://seu-app.vercel.app`

### PARTE 3: Conectar Frontend ↔ Backend (2 min)

1. **Volte ao Railway**
   - Edite variável `FRONTEND_URL`
   - Substitua por: `https://seu-app.vercel.app`
   - Railway fará redeploy automático

2. **Volte ao Railway (novamente)**
   - Edite variável `ALLOWED_HOSTS`
   - Adicione: `seu-app.railway.app,seu-app.vercel.app`

3. **Teste**
   - Acesse: `https://seu-app.vercel.app`
   - Abra console do navegador (F12)
   - Verifique se não há erros de CORS

### PARTE 4: Testes Finais (3 min)

✅ **Frontend**
- [ ] Página inicial carrega
- [ ] Imagens aparecem
- [ ] Navegação funciona

✅ **Backend/API**
- [ ] Acesse: `https://seu-app.railway.app/api/health/`
- [ ] Deve retornar: `{"status":"ok"}`
- [ ] Acesse: `https://seu-app.railway.app/admin`
- [ ] Login funciona

✅ **Integração**
- [ ] Frontend consegue buscar dados da API
- [ ] Formulários funcionam
- [ ] Sem erros de CORS no console

---

## 🎯 URLs Importantes

Após deploy, você terá:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | https://seu-app.vercel.app | Site público |
| Backend API | https://seu-app.railway.app/api | Endpoints REST |
| Admin Django | https://seu-app.railway.app/admin | Painel admin |
| PostgreSQL | (interno Railway) | Banco de dados |

---

## 🔧 Troubleshooting Rápido

### Erro: 500 Internal Server Error
```bash
# Ver logs no Railway
Railway Dashboard → Deploy Logs
```

### Erro: CORS
```bash
# Verificar variáveis no Railway:
FRONTEND_URL=https://seu-app.vercel.app  # ← URL correta?
ALLOWED_HOSTS=seu-app.railway.app        # ← Incluído?
```

### Frontend não carrega dados
```bash
# Verificar variável no Vercel:
NEXT_PUBLIC_API_BASE_URL=https://seu-app.railway.app/api  # ← URL correta?
```

### Migrações não aplicadas
```bash
# Railway Shell:
python manage.py migrate
```

---

## 📝 Checklist Pós-Deploy

- [ ] Backend responde em `/api/health/`
- [ ] Frontend carrega sem erros
- [ ] CORS configurado (sem erros no console)
- [ ] Admin Django acessível
- [ ] Superusuário criado
- [ ] Variáveis de ambiente configuradas
- [ ] SSL/HTTPS ativo (automático)
- [ ] Domínio customizado (opcional)

---

## 🚀 Próximos Passos

1. **Domínio Customizado**
   - Railway: Settings → Networking → Custom Domain
   - Vercel: Settings → Domains → Add Domain

2. **Popular Banco**
   - Acesse admin: `https://seu-app.railway.app/admin`
   - Adicione categorias, vozes, depoimentos

3. **Monitoramento**
   - Configure alertas no Railway
   - Adicione analytics no Vercel

4. **Backups**
   - Configure backups automáticos do PostgreSQL

---

## 💰 Custos Estimados

- **Railway**: $5/mês (inclui PostgreSQL)
- **Vercel**: Gratuito
- **Total**: ~$5/mês

---

## 🆘 Precisa de Ajuda?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Django Deploy: https://docs.djangoproject.com/en/stable/howto/deployment/

---

**Tempo total estimado**: 15-20 minutos  
**Dificuldade**: Fácil  
**Custo**: ~$5/mês
