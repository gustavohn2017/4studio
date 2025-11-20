# 🚀 Deploy 4Studio no Hostinger - Guia Completo

## 📋 Visão Geral

O Hostinger oferece hospedagem compartilhada e VPS. Para o 4Studio (Django + Next.js + PostgreSQL), você precisará de:

- **VPS** (recomendado) ou **Business/Cloud Hosting** (limitado)
- Python 3.12+
- PostgreSQL
- Node.js 20+

> ⚠️ **Importante**: Hospedagem compartilhada básica do Hostinger **não suporta** Django adequadamente. Você precisará de VPS.

---

## 🎯 Opções no Hostinger

### Opção 1: VPS Hostinger (Recomendado) ⭐

**Plano**: VPS KVM 1 ou superior  
**Custo**: ~R$20-40/mês  
**Inclui**: Servidor Ubuntu, acesso root, IP dedicado

✅ **Suporta**: Django, PostgreSQL, Node.js  
✅ **Controle Total**: Sim  
✅ **Performance**: Excelente

### Opção 2: Cloud Hosting (Limitado)

**Plano**: Cloud Startup ou superior  
**Custo**: ~R$30-50/mês  
**Limitações**: Acesso SSH limitado, sem root

⚠️ **Suporta**: Python via CGI (limitado)  
⚠️ **Django**: Complicado de configurar  
⚠️ **Recomendação**: Use VPS ao invés

---

## 🚀 DEPLOY NO VPS HOSTINGER (Passo a Passo)

### PARTE 1: Contratar e Configurar VPS

#### 1.1. Contratar VPS

1. Acesse: https://www.hostinger.com.br/vps-hosting
2. Escolha plano (VPS KVM 1 é suficiente para começar)
3. Selecione localização: **Brasil** (melhor latência)
4. Sistema Operacional: **Ubuntu 22.04 LTS**
5. Finalize a compra

#### 1.2. Acessar VPS via SSH

Você receberá por email:
- **IP do servidor**: `xxx.xxx.xxx.xxx`
- **Usuário root**: `root`
- **Senha**: `senha-temporaria`

**Windows (PowerShell/CMD)**:
```powershell
ssh root@xxx.xxx.xxx.xxx
# Digite a senha quando solicitado
```

**Windows (alternativa) - PuTTY**:
- Baixe: https://www.putty.org/
- Host: `xxx.xxx.xxx.xxx`
- Port: `22`
- Click "Open"

#### 1.3. Primeira Configuração

```bash
# 1. Atualizar sistema
apt update && apt upgrade -y

# 2. Criar usuário não-root
adduser 4studio
# Digite uma senha forte
# Pressione Enter nas outras perguntas

# 3. Adicionar usuário ao sudo
usermod -aG sudo 4studio

# 4. Mudar para novo usuário
su - 4studio
```

---

### PARTE 2: Instalar Dependências

#### 2.1. Instalar Python 3.12

```bash
# Adicionar repositório deadsnakes
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update

# Instalar Python 3.12
sudo apt install -y python3.12 python3.12-venv python3.12-dev python3-pip

# Verificar instalação
python3.12 --version
```

#### 2.2. Instalar PostgreSQL

```bash
# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verificar status
sudo systemctl status postgresql
```

#### 2.3. Configurar Banco de Dados

```bash
# Acessar PostgreSQL
sudo -u postgres psql

# Dentro do PostgreSQL, execute:
CREATE DATABASE studio4_db;
CREATE USER studio4_user WITH PASSWORD 'SuaSenhaForteAqui123!';
ALTER ROLE studio4_user SET client_encoding TO 'utf8';
ALTER ROLE studio4_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE studio4_user SET timezone TO 'America/Sao_Paulo';
GRANT ALL PRIVILEGES ON DATABASE studio4_db TO studio4_user;
\q
```

#### 2.4. Instalar Node.js

```bash
# Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs

# Verificar instalação
node --version
npm --version
```

#### 2.5. Instalar Nginx

```bash
# Instalar Nginx
sudo apt install -y nginx

# Iniciar e habilitar
sudo systemctl start nginx
sudo systemctl enable nginx

# Permitir no firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

### PARTE 3: Deploy do Backend Django

#### 3.1. Clonar Repositório

```bash
cd /home/4studio
git clone https://github.com/gustavohn2017/4studio.git
cd 4studio/4studio-backend
```

#### 3.2. Configurar Ambiente Virtual

```bash
# Criar ambiente virtual
python3.12 -m venv venv

# Ativar ambiente
source venv/bin/activate

# Atualizar pip
pip install --upgrade pip

# Instalar dependências
pip install -r requirements.txt
pip install gunicorn
```

#### 3.3. Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env
nano .env
```

Cole o seguinte conteúdo (ajuste os valores):

```env
# Django Settings
DEBUG=False
SECRET_KEY=gere-uma-chave-secreta-aqui-use-comando-abaixo
ALLOWED_HOSTS=seu-dominio.com,www.seu-dominio.com,xxx.xxx.xxx.xxx
DJANGO_SETTINGS_MODULE=4studio.settings_prod

# Database
DB_NAME=studio4_db
DB_USER=studio4_user
DB_PASSWORD=SuaSenhaForteAqui123!
DB_HOST=localhost
DB_PORT=5432

# Email (opcional)
EMAIL_HOST_USER=seu-email@gmail.com
EMAIL_HOST_PASSWORD=sua-senha-app
DEFAULT_FROM_EMAIL=seu-email@gmail.com
ADMIN_EMAIL=admin@4studio.com.br

# Frontend URL (para CORS)
FRONTEND_URL=https://seu-dominio.com
```

**Gerar SECRET_KEY**:
```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

Salve: `Ctrl+X`, depois `Y`, depois `Enter`

#### 3.4. Aplicar Migrações e Coletar Estáticos

```bash
# Ativar ambiente virtual (se não estiver ativado)
source venv/bin/activate

# Aplicar migrações
python manage.py migrate

# Coletar arquivos estáticos
python manage.py collectstatic --no-input

# Criar superusuário
python manage.py createsuperuser
# Siga as instruções
```

#### 3.5. Testar Gunicorn

```bash
# Testar se Gunicorn funciona
gunicorn --bind 0.0.0.0:8000 4studio.wsgi:application

# Acesse no navegador: http://xxx.xxx.xxx.xxx:8000
# Se funcionar, pressione Ctrl+C para parar
```

#### 3.6. Configurar Gunicorn como Serviço

```bash
# Criar arquivo de serviço
sudo nano /etc/systemd/system/4studio-backend.service
```

Cole:

```ini
[Unit]
Description=4Studio Backend Django (Gunicorn)
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
          --timeout 120 \
          --log-level info \
          4studio.wsgi:application

[Install]
WantedBy=multi-user.target
```

Salve e habilite:

```bash
# Recarregar systemd
sudo systemctl daemon-reload

# Habilitar e iniciar serviço
sudo systemctl enable 4studio-backend
sudo systemctl start 4studio-backend

# Verificar status
sudo systemctl status 4studio-backend

# Ver logs (se houver erro)
sudo journalctl -u 4studio-backend -n 50
```

---

### PARTE 4: Deploy do Frontend Next.js

#### 4.1. Build do Frontend

```bash
cd /home/4studio/4studio/4studio-frontend

# Instalar dependências
npm install

# Criar arquivo .env.production
nano .env.production
```

Cole:

```env
NEXT_PUBLIC_API_BASE_URL=https://seu-dominio.com/api
NODE_ENV=production
```

Salve e faça o build:

```bash
# Build para produção
npm run build

# Testar localmente
npm run start
# Acesse: http://xxx.xxx.xxx.xxx:3000
# Se funcionar, pressione Ctrl+C
```

#### 4.2. Configurar PM2

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar Next.js com PM2
pm2 start npm --name "4studio-frontend" -- start

# Configurar para iniciar no boot
pm2 startup systemd
# Execute o comando que aparecer (começa com sudo)

# Salvar configuração
pm2 save

# Verificar status
pm2 status
pm2 logs 4studio-frontend
```

---

### PARTE 5: Configurar Nginx

#### 5.1. Configurar Site

```bash
# Criar arquivo de configuração
sudo nano /etc/nginx/sites-available/4studio
```

Cole (substitua `seu-dominio.com` pelo seu domínio real):

```nginx
# Backend (Django via Gunicorn)
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

    client_max_body_size 100M;

    # Frontend - Rotas principais
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend - API
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    # Backend - Admin Django
    location /admin {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    # Backend - Admin Panel
    location /admin-panel {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    # Static files do Django
    location /static/ {
        alias /home/4studio/4studio/4studio-backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Media files (uploads)
    location /media/ {
        alias /home/4studio/4studio/4studio-backend/media/;
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

Salve e ative:

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/4studio /etc/nginx/sites-enabled/

# Remover site padrão
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx
```

---

### PARTE 6: Configurar Domínio e SSL

#### 6.1. Apontar Domínio para VPS

No painel do seu domínio (Registro.br, GoDaddy, etc):

1. Acesse configurações de DNS
2. Adicione/Edite registros:

```
Tipo A:
Nome: @
Valor: xxx.xxx.xxx.xxx (IP do VPS)
TTL: 3600

Tipo A:
Nome: www
Valor: xxx.xxx.xxx.xxx (IP do VPS)
TTL: 3600
```

3. Aguarde propagação (pode levar até 24h, geralmente 1-2h)

#### 6.2. Instalar SSL com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com

# Responda as perguntas:
# - Email: seu-email@gmail.com
# - Termos: Aceitar (A)
# - Compartilhar email: Não (N)
# - Redirect HTTP -> HTTPS: Sim (2)

# Testar renovação automática
sudo certbot renew --dry-run
```

---

### PARTE 7: Verificações Finais

#### 7.1. Testar Serviços

```bash
# Backend
sudo systemctl status 4studio-backend
curl http://localhost:8000/api/health/

# Frontend
pm2 status
curl http://localhost:3000

# Nginx
sudo systemctl status nginx
```

#### 7.2. Testar no Navegador

Acesse:
- **Frontend**: `https://seu-dominio.com`
- **API**: `https://seu-dominio.com/api/health/`
- **Admin**: `https://seu-dominio.com/admin/`

---

## 🔧 Comandos de Manutenção

### Atualizar Código

```bash
# Backend
cd /home/4studio/4studio/4studio-backend
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --no-input
sudo systemctl restart 4studio-backend

# Frontend
cd /home/4studio/4studio/4studio-frontend
git pull origin main
npm install
npm run build
pm2 restart 4studio-frontend
```

### Ver Logs

```bash
# Backend
sudo journalctl -u 4studio-backend -f

# Frontend
pm2 logs 4studio-frontend

# Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Backup do Banco

```bash
# Criar backup
pg_dump -U studio4_user studio4_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar backup
psql -U studio4_user studio4_db < backup_20250120_100000.sql
```

---

## 💰 Custos no Hostinger

| Plano VPS | RAM | CPU | Disco | Preço/mês |
|-----------|-----|-----|-------|-----------|
| **KVM 1** | 4GB | 2 vCPU | 50GB SSD | R$20-30 |
| **KVM 2** | 8GB | 4 vCPU | 100GB SSD | R$40-50 |
| **KVM 4** | 16GB | 6 vCPU | 200GB SSD | R$70-90 |

**Recomendação**: Comece com **KVM 1** (4GB RAM)

---

## 🎯 Vantagens do VPS Hostinger

✅ Suporte em Português  
✅ Painel hPanel intuitivo  
✅ Backups semanais automáticos  
✅ IP brasileiro (melhor SEO local)  
✅ Suporte 24/7 por chat  
✅ Migração gratuita (se contratar)  

---

## 📞 Suporte Hostinger

- **Chat**: https://www.hostinger.com.br (canto inferior direito)
- **Tutoriais**: https://support.hostinger.com/
- **Telefone**: Disponível no painel após contratar

---

## 🆘 Troubleshooting Comum

### Erro: Gunicorn não inicia
```bash
# Ver logs detalhados
sudo journalctl -u 4studio-backend -n 100

# Verificar arquivo .sock
ls -la /home/4studio/4studio/4studio-backend/gunicorn.sock

# Testar manualmente
cd /home/4studio/4studio/4studio-backend
source venv/bin/activate
gunicorn --bind 0.0.0.0:8000 4studio.wsgi:application
```

### Erro: 502 Bad Gateway
```bash
# Verificar se backend está rodando
sudo systemctl status 4studio-backend

# Verificar permissões do socket
sudo chmod 755 /home/4studio
sudo chmod 755 /home/4studio/4studio
sudo chmod 755 /home/4studio/4studio/4studio-backend
```

### Erro: Static files não carregam
```bash
cd /home/4studio/4studio/4studio-backend
source venv/bin/activate
python manage.py collectstatic --no-input
sudo systemctl restart nginx
```

---

## ✅ Checklist Pós-Deploy

- [ ] Backend rodando (systemctl status)
- [ ] Frontend rodando (pm2 status)
- [ ] Nginx ativo (systemctl status nginx)
- [ ] PostgreSQL conectado
- [ ] SSL instalado (HTTPS funcionando)
- [ ] Admin Django acessível
- [ ] API respondendo
- [ ] Frontend carrega sem erros
- [ ] Domínio apontado corretamente
- [ ] Backups configurados

---

**Tempo estimado**: 1-2 horas  
**Dificuldade**: Média  
**Custo**: ~R$20-30/mês (VPS KVM 1)
