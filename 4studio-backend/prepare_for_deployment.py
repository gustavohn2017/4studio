#!/usr/bin/env python
"""
Script para preparar o backend do 4studio para deployment
"""
import os
import sys
import subprocess
import shutil
from pathlib import Path
from getpass import getpass

BASE_DIR = Path(__file__).resolve().parent

def main():
    print("\n=== Preparando o 4studio Backend para Deployment ===\n")
    
    # Verificar se estamos no diretório correto
    if not (BASE_DIR / "manage.py").exists():
        print("Erro: Este script deve ser executado no diretório 4studio-backend!")
        sys.exit(1)
    
    # Verificar se o ambiente virtual está ativado
    if "VIRTUAL_ENV" not in os.environ:
        print("Aviso: É recomendado executar este script com o ambiente virtual ativado.")
        response = input("Deseja continuar mesmo assim? (s/n): ")
        if response.lower() != 's':
            sys.exit(0)
    
    # Verificar e criar arquivo .env
    env_file = BASE_DIR / '.env'
    if not env_file.exists():
        create_env_file(env_file)
    
    # Instalar/atualizar dependências
    print("\nInstalando dependências...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    
    # Coletar arquivos estáticos
    print("\nColetando arquivos estáticos...")
    subprocess.run([sys.executable, "manage.py", "collectstatic", "--noinput"])
    
    # Fazer migrações
    print("\nRealizando migrações do banco de dados...")
    subprocess.run([sys.executable, "manage.py", "makemigrations"])
    subprocess.run([sys.executable, "manage.py", "migrate"])
    
    # Testar servidor
    print("\nRealizando teste do servidor...")
    print("Iniciando o servidor Django. Pressione Ctrl+C para interromper após testar.")
    try:
        subprocess.run([sys.executable, "manage.py", "runserver"])
    except KeyboardInterrupt:
        print("\nServidor interrompido.")
    
    print("\n=== Backend preparado com sucesso para deployment! ===")
    print("\nPróximos passos:")
    print("1. Faça upload do código para o GitHub")
    print("2. Configure o serviço de hosting (Render, Railway, PythonAnywhere)")
    print("3. Configure as variáveis de ambiente no serviço de hosting")
    print("4. Atualize a URL da API no frontend")

def create_env_file(env_file):
    """Criar arquivo .env com configurações básicas"""
    print("\nConfigurando arquivo .env...")
    print("Por favor, forneça as seguintes informações:")
    
    secret_key = input("SECRET_KEY (deixe em branco para gerar uma aleatória): ")
    if not secret_key:
        import secrets
        secret_key = secrets.token_urlsafe(50)
    
    debug = input("DEBUG (True/False, recomendado False para produção): ") or "False"
    allowed_hosts = input("ALLOWED_HOSTS (separados por vírgula): ") or ".onrender.com,localhost,127.0.0.1"
    
    use_postgres = input("Usar PostgreSQL? (s/n, n=SQLite): ").lower() == 's'
    if use_postgres:
        db_name = input("Nome do banco de dados PostgreSQL: ") or "4studio"
        db_user = input("Usuário PostgreSQL: ") or "postgres"
        db_password = getpass("Senha PostgreSQL: ")
        db_host = input("Host PostgreSQL: ") or "localhost"
        db_port = input("Porta PostgreSQL: ") or "5432"
        database_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    else:
        database_url = "sqlite:///db.sqlite3"
    
    cors_origins = input("CORS_ALLOWED_ORIGINS (separados por vírgula): ") or "https://gustavohn2017.github.io"
    
    with open(env_file, 'w') as f:
        f.write(f"# Arquivo de configuração para 4Studio Backend\n")
        f.write(f"# Gerado automaticamente pelo script de preparação para deployment\n\n")
        f.write(f"# Configurações Django\n")
        f.write(f"PRODUCTION=true\n")
        f.write(f"DEBUG={debug}\n")
        f.write(f"SECRET_KEY={secret_key}\n")
        f.write(f"ALLOWED_HOSTS={allowed_hosts}\n\n")
        f.write(f"# Configurações do Banco de Dados\n")
        f.write(f"DATABASE_URL={database_url}\n\n")
        f.write(f"# Configurações CORS\n")
        f.write(f"CORS_ALLOWED_ORIGINS={cors_origins}\n")
        f.write(f"CSRF_TRUSTED_ORIGINS={cors_origins}\n\n")
        f.write(f"# Configurações de Email (atualize para envio real)\n")
        f.write(f"EMAIL_HOST=smtp.gmail.com\n")
        f.write(f"EMAIL_PORT=587\n")
        f.write(f"EMAIL_USE_TLS=True\n")
        f.write(f"EMAIL_HOST_USER=seu-email@gmail.com\n")
        f.write(f"EMAIL_HOST_PASSWORD=sua-senha-de-app\n")
    
    print(f"Arquivo .env criado em {env_file}")

if __name__ == "__main__":
    main()
