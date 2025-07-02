# Guia de Implantação do VoiceTel

Este documento fornece instruções detalhadas para implantação do sistema VoiceTel em ambientes de desenvolvimento e produção.

## Implantação em Ambiente de Desenvolvimento

### Pré-requisitos
- Python 3.9+
- Node.js 18+
- Git
- PostgreSQL (opcional, pode usar SQLite)

### Passos para Implantação

1. **Clone o repositório**
   ```
   git clone https://github.com/gustavohn2017/voicetel.git
   cd voicetel
   ```

2. **Configuração Automática**
   
   Execute o script de inicialização:
   ```
   .\start_development.ps1
   ```

3. **Configuração Manual**

   #### Backend (Django):
   
   ```
   cd voicetel-backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

   #### Frontend (Next.js):
   
   ```
   cd voicetel-frontend
   npm install
   npm run dev
   ```

## Implantação em Ambiente de Produção

### Backend (Django)

1. **Preparação do Servidor**
   
   - Instale Python 3.9+, PostgreSQL, Nginx e outras dependências:
     ```
     sudo apt update
     sudo apt install python3-pip python3-venv postgresql nginx
     ```

2. **Configuração do Banco de Dados**
   
   - Crie um banco de dados PostgreSQL:
     ```
     sudo -u postgres psql
     CREATE DATABASE voicetel_db;
     CREATE USER voicetel_user WITH PASSWORD 'senha_segura';
     GRANT ALL PRIVILEGES ON DATABASE voicetel_db TO voicetel_user;
     \q
     ```

3. **Implantação do Código**
   
   - Clone o repositório:
     ```
     git clone https://github.com/gustavohn2017/voicetel.git
     cd voicetel/voicetel-backend
     ```
   
   - Configure o ambiente virtual:
     ```
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     pip install gunicorn
     ```

4. **Configurações de Produção**
   
   - Crie um arquivo `.env` para configurações sensíveis:
     ```
     SECRET_KEY=sua_chave_secreta_gerada
     DEBUG=False
     ALLOWED_HOSTS=seu_dominio.com,www.seu_dominio.com
     DB_NAME=voicetel_db
     DB_USER=voicetel_user
     DB_PASSWORD=senha_segura
     DB_HOST=localhost
     EMAIL_HOST=smtp.seu_provedor.com
     EMAIL_PORT=587
     EMAIL_HOST_USER=seu_email@provedor.com
     EMAIL_HOST_PASSWORD=sua_senha_de_app
     ```

   - Configure o settings.py para usar variáveis de ambiente

5. **Configuração do Gunicorn**
   
   - Crie um arquivo systemd para o serviço:
     ```
     sudo nano /etc/systemd/system/voicetel.service
     ```
   
   - Adicione o seguinte conteúdo:
     ```
     [Unit]
     Description=Gunicorn daemon for VoiceTel
     After=network.target

     [Service]
     User=www-data
     Group=www-data
     WorkingDirectory=/caminho/para/voicetel/voicetel-backend
     ExecStart=/caminho/para/voicetel/voicetel-backend/venv/bin/gunicorn \
               --access-logfile - \
               --workers 3 \
               --bind unix:/caminho/para/voicetel/voicetel-backend/voicetel.sock \
               voicetel.wsgi:application

     [Install]
     WantedBy=multi-user.target
     ```

6. **Configuração do Nginx**
   
   - Crie um arquivo de configuração:
     ```
     sudo nano /etc/nginx/sites-available/voicetel
     ```
   
   - Adicione o seguinte conteúdo:
     ```
     server {
         listen 80;
         server_name seu_dominio.com www.seu_dominio.com;

         location = /favicon.ico { access_log off; log_not_found off; }
         
         location /static/ {
             root /caminho/para/voicetel/voicetel-backend;
         }

         location /media/ {
             root /caminho/para/voicetel/voicetel-backend;
         }

         location / {
             include proxy_params;
             proxy_pass http://unix:/caminho/para/voicetel/voicetel-backend/voicetel.sock;
         }
     }
     ```

   - Habilite o site:
     ```
     sudo ln -s /etc/nginx/sites-available/voicetel /etc/nginx/sites-enabled
     sudo nginx -t
     sudo systemctl restart nginx
     ```

7. **Configure o HTTPS com Let's Encrypt**
   ```
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d seu_dominio.com -d www.seu_dominio.com
   ```

8. **Inicie o serviço**
   ```
   sudo systemctl start voicetel
   sudo systemctl enable voicetel
   ```

### Frontend (Next.js)

#### Opção 1: Implantação na Vercel (Recomendado)

1. Crie uma conta na Vercel: https://vercel.com/signup
2. Instale a CLI da Vercel: `npm i -g vercel`
3. Navegue até a pasta do frontend: `cd voicetel-frontend`
4. Execute o comando: `vercel`
5. Siga as instruções para deployment

#### Opção 2: Build Estático

1. Navegue até a pasta do frontend:
   ```
   cd voicetel-frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Construa o aplicativo:
   ```
   npm run build
   ```

4. O resultado estará na pasta `.next/` que pode ser servido por um servidor web como Nginx

5. Configure o Nginx:
   ```
   server {
       listen 80;
       server_name frontend.seu_dominio.com;

       root /caminho/para/voicetel/voicetel-frontend/.next;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

#### Opção 3: Deploy no GitHub Pages

1. Certifique-se de que as configurações do seu repositório estão corretas:
   - No GitHub, vá para Settings > Pages
   - Em "Source", selecione "GitHub Actions"

2. As configurações para GitHub Pages já estão incluídas no arquivo `next.config.ts` com:
   ```typescript
   output: 'export',
   basePath: isGithubActions ? `/${repo}` : '',
   assetPrefix: isGithubActions ? `/${repo}/` : '',
   ```

3. O workflow para deploy automático já está configurado em `.github/workflows/github-pages.yml`

4. Para testar o build localmente antes de fazer push:
   ```powershell
   cd voicetel-frontend
   npm run build
   # Verifique se a pasta 'out' foi criada com os arquivos estáticos
   ```
   
5. Para configurar a URL da API para produção:
   - Vá para Settings > Secrets and variables > Actions
   - Adicione um novo repositório secret chamado `NEXT_PUBLIC_API_URL` com a URL da sua API em produção

6. Depois de fazer push para a branch main, o workflow do GitHub Actions fará o deploy automaticamente.
   Você pode acompanhar o progresso na guia Actions do seu repositório.

7. O site estará disponível em `https://seu-usuario.github.io/voicetel/`

8. **Nota:** Por ser um site estático no GitHub Pages, o frontend precisará comunicar-se com uma API externa.
   Certifique-se de que sua API backend está hospedada em algum lugar acessível publicamente e configure o CORS
   adequadamente para permitir requisições do seu domínio GitHub Pages.

## Manutenção

### Atualizações

1. Puxe as últimas mudanças:
   ```
   git pull origin main
   ```

2. Atualize as dependências:
   ```
   # Backend
   cd voicetel-backend
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate

   # Frontend
   cd ../voicetel-frontend
   npm install
   npm run build
   ```

3. Reinicie os serviços:
   ```
   sudo systemctl restart voicetel
   sudo systemctl restart nginx
   ```

### Backup

1. Backup do banco de dados:
   ```
   pg_dump -U voicetel_user -h localhost -d voicetel_db > voicetel_backup_$(date +%Y%m%d).sql
   ```

2. Backup de arquivos de mídia:
   ```
   tar -zcvf media_backup_$(date +%Y%m%d).tar.gz /caminho/para/voicetel/voicetel-backend/media
   ```

## Solução de Problemas

### Verificação de Logs

- Django/Gunicorn: `sudo journalctl -u voicetel`
- Nginx: `sudo tail -f /var/log/nginx/error.log`

### Problemas Comuns

1. **Erro de Conexão com Banco de Dados**
   - Verifique credenciais no `.env`
   - Confirme que PostgreSQL está rodando: `sudo systemctl status postgresql`

2. **Arquivos Estáticos Não Aparecem**
   - Execute `python manage.py collectstatic`
   - Verifique permissões: `sudo chown -R www-data:www-data /caminho/para/voicetel/voicetel-backend/static`

3. **Erro 502 Bad Gateway**
   - Verifique se Gunicorn está rodando: `sudo systemctl status voicetel`
   - Verifique permissões do socket: `sudo chown www-data:www-data /caminho/para/voicetel/voicetel-backend/voicetel.sock`
