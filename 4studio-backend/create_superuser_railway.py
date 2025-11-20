#!/usr/bin/env python
"""
Script para criar superuser no Railway
Execute: python create_superuser_railway.py
"""
import os
import sys
import django

# Variáveis de ambiente necessárias (pegue no Railway > 4studio > Variables)
os.environ['DATABASE_URL'] = 'COLE_A_DATABASE_URL_AQUI'
os.environ['SECRET_KEY'] = '$-afhnh^&@e4e-s+913l2ufba=-9p4bfw7oa*hx*15cbdjz$5r'
os.environ['DEBUG'] = 'False'
os.environ['ALLOWED_HOSTS'] = '.railway.app,.up.railway.app'
os.environ['DJANGO_SETTINGS_MODULE'] = '4studio.settings_prod'

# Adicionar o diretório ao path
sys.path.insert(0, os.path.dirname(__file__))

# Setup Django
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Dados do superuser
print("\n=== Criar Superuser no Railway ===\n")
username = input("Username: ") or "admin"
email = input("Email: ") or "admin@4studio.com"
password = input("Password: ")

if not password:
    print("❌ Password é obrigatório!")
    sys.exit(1)

# Criar superuser
try:
    if User.objects.filter(username=username).exists():
        print(f"❌ User '{username}' já existe!")
        update = input("Deseja atualizar a senha? (s/n): ")
        if update.lower() == 's':
            user = User.objects.get(username=username)
            user.set_password(password)
            user.save()
            print(f"✅ Senha do user '{username}' atualizada!")
    else:
        User.objects.create_superuser(username=username, email=email, password=password)
        print(f"✅ Superuser '{username}' criado com sucesso!")
        print(f"   Email: {email}")
        print(f"\n🔗 Acesse: https://4studio-production.up.railway.app/admin/")
except Exception as e:
    print(f"❌ Erro: {e}")
    import traceback
    traceback.print_exc()
