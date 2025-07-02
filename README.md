# 4studio - Sistema de Gestão de Áudio

4studio é um sistema completo para gerenciamento e apresentação de serviços de locução, URA e espera telefônica. O projeto consiste em um frontend desenvolvido em Next.js + Tailwind CSS e um backend em Python Django + PostgreSQL.

## Estrutura do Projeto

O projeto está dividido em duas aplicações principais:

- **4studio-frontend**: Interface do cliente desenvolvida em Next.js + Tailwind CSS
- **4studio-backend**: API e painel administrativo desenvolvidos em Django + PostgreSQL

## Requisitos do Sistema

- Python 3.9 ou superior
- Node.js 18.0 ou superior
- PostgreSQL 12 ou superior

## Configuração Rápida

Para configurar e executar todo o ambiente de desenvolvimento com um único comando, use o script de inicialização:

```bash
# No Windows, execute o arquivo batch
start_development.bat

# OU com PowerShell
.\start_development.ps1
```

Este script irá:
1. Verificar os pré-requisitos (Node.js e Python)
2. Configurar o ambiente virtual Python
3. Instalar todas as dependências do backend e frontend
4. Aplicar as migrações do banco de dados
5. Oferecer a opção de criar um superusuário para o painel admin
6. Iniciar os servidores backend e frontend em janelas separadas

## Configuração Manual

### Backend (Django)

1. Navegue até a pasta do backend:
```bash
cd 4studio-backend
```

2. Crie e ative um ambiente virtual:
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/macOS
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure o banco de dados:
   - Por padrão, está configurado para usar SQLite para facilitar o desenvolvimento
   - Para usar PostgreSQL, edite o arquivo `4studio/settings.py` e descomente a configuração do PostgreSQL

5. Configure as variáveis de e-mail no arquivo `4studio/settings.py`:
```python
EMAIL_HOST = 'seu.servidor.smtp.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'seu-email@dominio.com'
EMAIL_HOST_PASSWORD = 'sua-senha-de-app'
DEFAULT_FROM_EMAIL = '4studio <noreply@4studio.com.br>'
ADMIN_EMAIL = 'admin@4studio.com.br'
```

6. Execute as migrações:
```bash
python manage.py migrate
```

7. Crie um superusuário:
```bash
python manage.py createsuperuser
```

8. Execute o servidor de desenvolvimento:
```bash
python manage.py runserver
```

O backend estará disponível em http://127.0.0.1:8000/ ou http://localhost:8000/

### Frontend (Next.js)

1. Navegue até a pasta do frontend:
```bash
cd 4studio-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em http://localhost:3000/

## Funcionalidades Principais

### Frontend (Cliente)
- Landing page responsiva com seções institucionais
- Player de amostras de áudio com filtros por categoria e tipo de voz
- Seção de depoimentos de clientes
- Formulário de contato com upload de scripts
- Botão flutuante de WhatsApp

### Backend (Administrativo)
- Painel administrativo para gestão de conteúdo
- Gerenciamento de amostras de áudio (upload, edição, exclusão)
- Gerenciamento de depoimentos de clientes
- Visualização e acompanhamento de solicitações de contato
- Integração de e-mail para notificações

## Deploy em Produção

### Backend (Django)
Para deploy do backend em produção, recomenda-se:
1. Usar Gunicorn como servidor WSGI
2. Configurar Nginx como proxy reverso
3. Usar PostgreSQL em produção
4. Configurar HTTPS com Let's Encrypt
5. Atualizar as variáveis de ambiente (SECRET_KEY, DEBUG, ALLOWED_HOSTS, etc.)

### Frontend (Next.js)
Para deploy do frontend em produção, recomenda-se:
1. Compilar o aplicativo: `npm run build`
2. Utilizar serviços como Vercel, Netlify, ou configurar um servidor Node.js

## Contato e Suporte

Para questões relacionadas ao sistema, entre em contato com:
- E-mail: suporte@4studio.com.br
- Telefone: (XX) XXXX-XXXX
