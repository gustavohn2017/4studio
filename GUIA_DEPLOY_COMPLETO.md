# 🚀 Guia Completo de Deploy - 4Studio

## Visão Geral da Arquitetura

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────┐
│   Frontend      │──────▶│    Backend       │──────▶│  PostgreSQL │
│   (Next.js)     │      │    (Django)      │      │  (Database) │
│   Port 3000     │      │    Port 8000     │      │             │
└─────────────────┘      └──────────────────┘      └─────────────┘
```

---

## 📋 Opções de Hospedagem Recomendadas

### Opção 1: Deploy Separado (Recomendado) ⭐

**Frontend**: Vercel ou Netlify (Gratuito)  
**Backend**: Railway, Render ou Heroku  
**Banco de Dados**: PostgreSQL gerenciado (incluído nos serviços acima)

**Vantagens**:
- Melhor performance
- Escalabilidade independente
- CDN automático para frontend
- SSL/HTTPS gratuito

### Opção 2: VPS (Servidor Único)

**Hospedagem**: DigitalOcean, AWS EC2, Linode, Contabo  
**Componentes**: Frontend + Backend + PostgreSQL no mesmo servidor

**Vantagens**:
- Controle total
- Custo previsível
- Dados localizados

---

## 🎯 OPÇÃO 1: Deploy Separado (Passo a Passo)

### PARTE 1: Backend Django (Railway / Render)

#### 1.1. Preparar o Backend para Produção

**a) Criar arquivo `runtime.txt` (se não existir)**
```bash
cd 4studio-backend
echo "python-3.12.6" > runtime.txt
```

**b) Atualizar `requirements.txt`**
```bash
# Adicionar dependências de produção
cd 4studio-backend
cat >> requirements.txt << EOF

# Produção
gunicorn==21.2.0
dj-database-url==2.1.0
whitenoise==6.6.0
EOF
```

**c) Criar/Atualizar `settings_prod.py`**

Já existe em `4studio/settings_prod.py`, mas vamos verificar configurações essenciais:

```python
# 4studio-backend/4studio/settings_prod.py
import os
import dj_database_url
from .settings import *

# Segurança
DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY')
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True
    )
}

# Static Files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# CORS - Atualizar com domínio do frontend
CORS_ALLOWED_ORIGINS = [
    os.environ.get('FRONTEND_URL', 'https://seu-frontend.vercel.app'),
]

# Security
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
```

**d) Criar `Procfile` para Gunicorn**
```bash
cd 4studio-backend
echo "web: gunicorn 4studio.wsgi --log-file -" > Procfile
```

**e) Criar `build.sh` para Railway/Render**
```bash
cd 4studio-backend
cat > build.sh << 'EOF'
#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
EOF
chmod +x build.sh
```

#### 1.2. Deploy no Railway.app

**a) Criar conta no Railway**
- Acesse: https://railway.app
- Faça login com GitHub

**b) Criar novo projeto**
1. Click em "New Project"
2. Escolha "Deploy from GitHub repo"
3. Selecione o repositório `4studio`
4. Railway detectará automaticamente o Django

**c) Configurar Variáveis de Ambiente**

No Railway Dashboard → Variables:

```env
DJANGO_SETTINGS_MODULE=4studio.settings_prod
SECRET_KEY=gere-uma-chave-secreta-forte-aqui
ALLOWED_HOSTS=seu-app.railway.app,seu-dominio.com
FRONTEND_URL=https://seu-frontend.vercel.app
DEBUG=False

# Email (se configurado)
EMAIL_HOST_USER=seu-email@gmail.com
EMAIL_HOST_PASSWORD=sua-senha-app
DEFAULT_FROM_EMAIL=seu-email@gmail.com
ADMIN_EMAIL=admin@4studio.com.br
```

**d) Adicionar PostgreSQL**
1. No Railway: "+ New" → "Database" → "PostgreSQL"
2. Railway criará automaticamente a variável `DATABASE_URL`

**e) Deploy**
- Railway fará deploy automaticamente
- URL estará disponível em: `https://seu-app.railway.app`

#### 1.3. Alternativa: Deploy no Render.com

**a) Criar conta no Render**
- Acesse: https://render.com
- Faça login com GitHub

**b) Criar Web Service**
1. "New" → "Web Service"
2. Conecte o repositório GitHub
3. Configure:
   - **Name**: 4studio-backend
   - **Root Directory**: `4studio-backend`
   - **Environment**: Python 3
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn 4studio.wsgi:application`

**c) Adicionar PostgreSQL**
1. "New" → "PostgreSQL"
2. Copie a `Internal Database URL`
3. Adicione como variável `DATABASE_URL` no Web Service

**d) Configurar Variáveis de Ambiente** (igual ao Railway)

---

### PARTE 2: Frontend Next.js (Vercel)

#### 2.1. Preparar Frontend para Produção

**a) Criar/Atualizar `.env.production`**
```bash
cd 4studio-frontend
cat > .env.production << EOF
NEXT_PUBLIC_API_BASE_URL=https://seu-backend.railway.app/api
NODE_ENV=production
EOF
```

**b) Atualizar `next.config.ts`**

Verificar se está configurado para produção:

```typescript
// 4studio-frontend/next.config.ts
const nextConfig = {
  output: 'standalone', // Para melhor performance
  images: {
    domains: [
      'localhost',
      'seu-backend.railway.app', // Adicionar domínio do backend
    ],
  },
  // ... resto da configuração
};
```

**c) Testar build local**
```bash
cd 4studio-frontend
npm run build
npm run start # Testar em modo produção
```

#### 2.2. Deploy no Vercel

**a) Criar conta na Vercel**
- Acesse: https://vercel.com
- Faça login com GitHub

**b) Importar Projeto**
1. Click em "Add New" → "Project"
2. Selecione o repositório `4studio`
3. Configure:
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: `4studio-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

**c) Configurar Variáveis de Ambiente**

Em Project Settings → Environment Variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://seu-backend.railway.app/api
```

**d) Deploy**
- Vercel fará deploy automaticamente
- URL estará disponível em: `https://seu-app.vercel.app`

**e) Configurar Domínio Customizado (Opcional)**
1. Project Settings → Domains
2. Adicione seu domínio: `www.4studio.com.br`
3. Configure DNS conforme instruções

#### 2.3. Atualizar CORS no Backend

Após deploy do frontend, atualize a variável no Railway/Render:

```env
FRONTEND_URL=https://seu-app.vercel.app
ALLOWED_HOSTS=seu-backend.railway.app,api.4studio.com.br
```

---

## 🎯 OPÇÃO 2: VPS (Servidor Único)

### Requisitos do Servidor

- **RAM**: Mínimo 2GB (Recomendado 4GB)
- **CPU**: 2 vCPUs
- **Disco**: 40GB SSD
- **OS**: Ubuntu 22.04 LTS

### 2.1. Preparar o Servidor

```bash
# Conectar ao servidor
ssh root@seu-ip-servidor

# Atualizar sistema
apt update && apt upgrade -y

# Instalar dependências
apt install -y python3.12 python3.12-venv python3-pip \
               postgresql postgresql-contrib \
               nginx git curl

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Criar usuário para a aplicação
adduser 4studio
usermod -aG sudo 4studio
su - 4studio
```

### 2.2. Configurar PostgreSQL

```bash
# Criar banco de dados
sudo -u postgres psql << EOF
CREATE DATABASE studio4_db;
CREATE USER studio4_user WITH PASSWORD 'senha-forte-aqui';
ALTER ROLE studio4_user SET client_encoding TO 'utf8';
ALTER ROLE studio4_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE studio4_user SET timezone TO 'America/Sao_Paulo';
GRANT ALL PRIVILEGES ON DATABASE studio4_db TO studio4_user;
\q
EOF
```

### 2.3. Deploy do Backend

```bash
# Clonar repositório
cd /home/4studio
git clone https://github.com/gustavohn2017/4studio.git
cd 4studio/4studio-backend

# Criar ambiente virtual
python3.12 -m venv venv
source venv/bin/activate

# Instalar dependências
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn

# Configurar .env
cat > .env << EOF
DEBUG=False
SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
ALLOWED_HOSTS=seu-dominio.com,www.seu-dominio.com,seu-ip
DB_NAME=studio4_db
DB_USER=studio4_user
DB_PASSWORD=senha-forte-aqui
DB_HOST=localhost
DB_PORT=5432
EOF

# Migrar banco
python manage.py migrate
python manage.py collectstatic --no-input

# Criar superusuário
python manage.py createsuperuser
```

### 2.4. Configurar Gunicorn (Backend)

```bash
# Criar arquivo de serviço systemd
sudo nano /etc/systemd/system/4studio-backend.service
```

Conteúdo:
```ini
[Unit]
Description=4Studio Backend (Gunicorn)
After=network.target

[Service]
Type=notify
User=4studio
Group=4studio
WorkingDirectory=/home/4studio/4studio/4studio-backend
Environment="PATH=/home/4studio/4studio/4studio-backend/venv/bin"
ExecStart=/home/4studio/4studio/4studio-backend/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/home/4studio/4studio/4studio-backend/gunicorn.sock \
          4studio.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# Habilitar e iniciar serviço
sudo systemctl enable 4studio-backend
sudo systemctl start 4studio-backend
sudo systemctl status 4studio-backend
```

### 2.5. Deploy do Frontend

```bash
cd /home/4studio/4studio/4studio-frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cat > .env.production << EOF
NEXT_PUBLIC_API_BASE_URL=https://seu-dominio.com/api
EOF

# Build para produção
npm run build

# Instalar PM2 para gerenciar Next.js
sudo npm install -g pm2

# Iniciar Next.js com PM2
pm2 start npm --name "4studio-frontend" -- start
pm2 save
pm2 startup
```

### 2.6. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/4studio
```

Conteúdo:
```nginx
# Backend (Django)
upstream backend {
    server unix:/home/4studio/4studio/4studio-backend/gunicorn.sock fail_timeout=0;
}

# Frontend (Next.js)
upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    # Redirecionar para HTTPS (após configurar SSL)
    # return 301 https://$server_name$request_uri;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://backend;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    # Admin Django
    location /admin {
        proxy_pass http://backend;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    # Static files do Django
    location /static {
        alias /home/4studio/4studio/4studio-backend/staticfiles;
    }

    # Media files
    location /media {
        alias /home/4studio/4studio/4studio-backend/media;
    }
}
```

```bash
# Habilitar site
sudo ln -s /etc/nginx/sites-available/4studio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 2.7. Configurar SSL (HTTPS) com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com

# Renovação automática já está configurada
sudo certbot renew --dry-run
```

---

## 📝 Checklist Pós-Deploy

### Backend
- [ ] Servidor rodando sem erros
- [ ] Banco de dados conectado
- [ ] Migrações aplicadas
- [ ] Static files coletados
- [ ] Admin Django acessível
- [ ] Endpoints API respondendo
- [ ] CORS configurado para frontend
- [ ] SSL/HTTPS ativo
- [ ] Logs funcionando

### Frontend
- [ ] Build concluído sem erros
- [ ] Servidor rodando
- [ ] Consegue fazer chamadas à API
- [ ] Imagens carregando
- [ ] Rotas funcionando
- [ ] SEO configurado
- [ ] SSL/HTTPS ativo

### Geral
- [ ] DNS apontando corretamente
- [ ] Email configurado (se aplicável)
- [ ] Backups configurados
- [ ] Monitoramento ativo
- [ ] Documentação atualizada

---

## 🔧 Comandos Úteis de Manutenção

### Backend (VPS)
```bash
# Ver logs do backend
sudo journalctl -u 4studio-backend -f

# Reiniciar backend
sudo systemctl restart 4studio-backend

# Atualizar código
cd /home/4studio/4studio
git pull origin main
cd 4studio-backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --no-input
sudo systemctl restart 4studio-backend
```

### Frontend (VPS)
```bash
# Ver logs do frontend
pm2 logs 4studio-frontend

# Reiniciar frontend
pm2 restart 4studio-frontend

# Atualizar código
cd /home/4studio/4studio/4studio-frontend
git pull origin main
npm install
npm run build
pm2 restart 4studio-frontend
```

### PostgreSQL
```bash
# Backup do banco
pg_dump -U studio4_user studio4_db > backup_$(date +%Y%m%d).sql

# Restaurar backup
psql -U studio4_user studio4_db < backup_20250101.sql
```

---

## 💰 Estimativa de Custos

### Opção 1: Deploy Separado
- **Frontend (Vercel)**: Gratuito
- **Backend (Railway)**: $5-10/mês
- **PostgreSQL**: Incluído no Railway
- **Total**: ~$5-10/mês

### Opção 2: VPS
- **DigitalOcean Droplet**: $12/mês (2GB RAM)
- **Contabo**: €5/mês (~R$30)
- **Total**: $12-20/mês

---

## 🎯 Recomendação Final

**Para começar**: Use **Opção 1** (Deploy Separado)
- Mais fácil e rápido
- Infraestrutura gerenciada
- SSL automático
- Escalável
- Custo inicial baixo

**Para crescer**: Migre para **Opção 2** (VPS) quando necessário
- Maior controle
- Melhor performance
- Custos previsíveis

---

## 📚 Próximos Passos Após Deploy

1. **Monitoramento**: Configure Sentry ou similar
2. **Analytics**: Adicione Google Analytics
3. **Backup**: Configure backups automáticos do banco
4. **CDN**: Configure CloudFlare para melhor performance
5. **CI/CD**: Configure deploy automático com GitHub Actions

---

## 🆘 Suporte e Troubleshooting

### Erro: 500 Internal Server Error
- Verifique logs do Django
- Confirme variáveis de ambiente
- Verifique conexão com banco de dados

### Erro: CORS
- Atualize `CORS_ALLOWED_ORIGINS` no backend
- Adicione domínio do frontend

### Erro: Static files não carregam
- Execute `python manage.py collectstatic`
- Verifique configuração do Nginx/Whitenoise

---

**Documentação criada em**: 20/11/2025  
**Última atualização**: 20/11/2025
