# Configuração do PostgreSQL para 4Studio

## Status Atual ✅

O projeto **já está configurado para usar PostgreSQL**:

- ✅ `settings.py` configurado para PostgreSQL
- ✅ `psycopg2-binary==2.9.10` instalado
- ✅ Variáveis de ambiente definidas no `.env`
- ✅ PostgreSQL 17.4 detectado no sistema

## Passos para Conectar ao PostgreSQL

### 1. Configurar a Senha do PostgreSQL

Atualize a senha no arquivo `.env` (linha 13):

```properties
DB_PASSWORD=SUA_SENHA_POSTGRES_AQUI
```

**Importante:** Use a senha real do usuário `postgres` do seu sistema.

### 2. Criar o Banco de Dados

Execute no terminal (substitua `SUA_SENHA` pela senha real):

```bash
# Opção 1: Usando o script SQL fornecido
psql -U postgres -f create_4studio_db.sql

# Opção 2: Criar manualmente
psql -U postgres -c "CREATE DATABASE \"4studio_db\" WITH ENCODING 'UTF8' LC_COLLATE='pt_BR.UTF-8' LC_CTYPE='pt_BR.UTF-8' TEMPLATE=template0;"
```

### 3. Aplicar Migrações Django

No diretório `4studio-backend`, execute:

```bash
# Ativar ambiente virtual (se usar)
.\venv\Scripts\Activate.ps1

# Aplicar migrações
python manage.py migrate

# Criar superusuário (opcional)
python manage.py createsuperuser
```

### 4. Testar a Conexão

```bash
python manage.py check
python manage.py showmigrations
```

## Variáveis de Ambiente (.env)

As seguintes variáveis estão configuradas para PostgreSQL:

```properties
DB_NAME=4studio_db          # Nome do banco
DB_USER=postgres            # Usuário PostgreSQL
DB_PASSWORD=postgres        # ⚠️ ALTERAR para sua senha real
DB_HOST=localhost           # Host do banco
DB_PORT=5432               # Porta padrão PostgreSQL
```

## Troubleshooting

### Erro de Autenticação

Se receber erro "autenticação do tipo senha falhou":

1. Verifique a senha do usuário `postgres`
2. Atualize `DB_PASSWORD` no `.env`
3. Verifique o arquivo `pg_hba.conf` do PostgreSQL

### Banco Não Existe

Se o Django reclamar que o banco não existe:

```bash
psql -U postgres -c "CREATE DATABASE \"4studio_db\" ENCODING 'UTF8';"
```

### Locale não Disponível

Se `pt_BR.UTF-8` não estiver disponível, use:

```bash
psql -U postgres -c "CREATE DATABASE \"4studio_db\" ENCODING 'UTF8';"
```

## Comandos Úteis

```bash
# Listar bancos de dados
psql -U postgres -c "\l"

# Conectar ao banco
psql -U postgres -d 4studio_db

# Verificar versão do PostgreSQL
psql --version

# Ver tabelas no banco
psql -U postgres -d 4studio_db -c "\dt"
```

## Próximos Passos

Após configurar o banco:

1. ✅ Execute `python manage.py migrate`
2. ✅ Crie um superusuário: `python manage.py createsuperuser`
3. ✅ Inicie o servidor: `python manage.py runserver`
4. ✅ Acesse http://localhost:8000/admin

## Alternativa: Usar SQLite (Desenvolvimento)

Se preferir SQLite para desenvolvimento, descomente as linhas 127-131 em `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

E comente o bloco PostgreSQL (linhas 108-125).
