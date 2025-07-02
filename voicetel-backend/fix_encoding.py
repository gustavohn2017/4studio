"""
Script para redefinir o banco de dados e executar migrações
"""
import os
import sys
import django

# Configurar o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'voicetel.settings')
django.setup()

from django.db import connection

# Executar o SQL para resolver problemas de codificação
with connection.cursor() as cursor:
    # Definir codificação para a sessão atual
    cursor.execute("SET client_encoding TO 'UTF8';")
    cursor.execute("SHOW client_encoding;")
    result = cursor.fetchone()
    print(f"Codificação definida para: {result[0]}")
    
    # Se necessário, você pode adicionar mais comandos SQL para diagnosticar problemas
    # cursor.execute("SELECT current_database();")
    # db = cursor.fetchone()[0]
    # print(f"Banco de dados atual: {db}")
    
print("\nConfigurações aplicadas com sucesso!")
print("Agora execute 'python manage.py migrate' para aplicar as migrações.")
