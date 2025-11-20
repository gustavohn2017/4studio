#!/usr/bin/env python
"""
Script simples para criar superuser conectando direto no PostgreSQL do Railway
"""
import psycopg2
from getpass import getpass
import hashlib
from django.contrib.auth.hashers import make_password

print("\n=== Criar Superuser no Railway ===\n")
print("Cole a DATABASE_URL do Railway")
print("(Railway > 4studio > Variables > DATABASE_URL)\n")

database_url = input("DATABASE_URL: ").strip()

if not database_url:
    print("❌ DATABASE_URL é obrigatória!")
    exit(1)

# Parse da URL
# Formato: postgresql://user:pass@host:port/dbname
database_url = database_url.replace('postgresql://', '').replace('postgres://', '')
user_pass, host_db = database_url.split('@')
username_db, password_db = user_pass.split(':')
host_port, dbname = host_db.split('/')
host, port = host_port.split(':') if ':' in host_port else (host_port, '5432')

print(f"\n✓ Conectando em {host}:{port}/{dbname}")

# Dados do superuser
username = input("\nUsername do superuser: ").strip() or "admin"
email = input("Email: ").strip() or "admin@4studio.com"
password = getpass("Password: ").strip()

if not password:
    print("❌ Password é obrigatória!")
    exit(1)

try:
    # Conectar no PostgreSQL
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=dbname,
        user=username_db,
        password=password_db
    )
    cursor = conn.cursor()
    
    # Verificar se user já existe
    cursor.execute("SELECT id FROM auth_user WHERE username = %s", (username,))
    existing = cursor.fetchone()
    
    if existing:
        print(f"\n❌ User '{username}' já existe!")
        update = input("Deseja atualizar a senha? (s/n): ").strip().lower()
        
        if update == 's':
            # Hash da senha usando Django's PBKDF2
            password_hash = make_password(password)
            cursor.execute(
                "UPDATE auth_user SET password = %s WHERE username = %s",
                (password_hash, username)
            )
            conn.commit()
            print(f"✅ Senha atualizada para '{username}'!")
    else:
        # Criar novo superuser
        password_hash = make_password(password)
        
        cursor.execute("""
            INSERT INTO auth_user 
            (password, last_login, is_superuser, username, first_name, last_name, 
             email, is_staff, is_active, date_joined)
            VALUES (%s, NULL, TRUE, %s, '', '', %s, TRUE, TRUE, NOW())
        """, (password_hash, username, email))
        
        conn.commit()
        print(f"\n✅ Superuser '{username}' criado com sucesso!")
        print(f"   Email: {email}")
    
    cursor.close()
    conn.close()
    
    print(f"\n🔗 Acesse: https://4studio-production.up.railway.app/admin/")
    print(f"   Username: {username}")
    
except Exception as e:
    print(f"\n❌ Erro: {e}")
    import traceback
    traceback.print_exc()
