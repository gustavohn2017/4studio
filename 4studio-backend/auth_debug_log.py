"""
Script para testar autenticação e ajudar a depurar problemas de login.
Execute este script para validar se um usuário pode ser autenticado corretamente.

Uso:
python auth_debug_log.py <username> <password>
"""

import os
import sys
import django

# Configurar o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '4studio.settings')
django.setup()

# Importar depois de configurar o ambiente
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

def test_authentication(username, password):
    """Testa a autenticação de um usuário e imprime detalhes para depuração."""
    print("\n==== TESTE DE AUTENTICAÇÃO ====")
    print(f"Tentando autenticar usuário: {username}")
    
    # Verificar se o usuário existe
    try:
        user = User.objects.get(username=username)
        print(f"✓ Usuário encontrado no banco de dados: {user.username}")
        print(f"  - ID: {user.id}")
        print(f"  - Superusuário: {user.is_superuser}")
        print(f"  - Staff: {user.is_staff}")
        print(f"  - Ativo: {user.is_active}")
        print(f"  - Data de entrada: {user.last_login}")
        
        # Método de hash da senha
        print(f"  - Algoritmo de senha: {user.password.split('$')[0] if '$' in user.password else 'unknown'}")
    except User.DoesNotExist:
        print(f"✗ Usuário '{username}' não existe no banco de dados.")
        return
    
    # Testar autenticação
    user = authenticate(username=username, password=password)
    if user is not None:
        print(f"✓ Autenticação bem-sucedida para {username}")
    else:
        print(f"✗ Falha na autenticação para {username}")
        
    print("\n==== USUÁRIOS DISPONÍVEIS ====")
    for u in User.objects.all():
        print(f"- {u.username} (superuser: {u.is_superuser}, active: {u.is_active})")
    
    print("\n==== CONFIGURAÇÕES RELEVANTES ====")
    # Importar settings após django.setup()
    from django.conf import settings
    print(f"AUTH_PASSWORD_VALIDATORS: {len(settings.AUTH_PASSWORD_VALIDATORS)}")
    print(f"LOGIN_URL: {settings.LOGIN_URL}")
    print(f"LOGIN_REDIRECT_URL: {settings.LOGIN_REDIRECT_URL}")
    
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python auth_debug_log.py <username> <password>")
        sys.exit(1)
        
    username = sys.argv[1]
    password = sys.argv[2]
    test_authentication(username, password)
