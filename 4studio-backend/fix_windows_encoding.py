"""
Script para corrigir problemas de codificação do PostgreSQL no Windows
"""

import os
import sys

def main():
    print("==== Correção de Codificação PostgreSQL para 4Studio ====")
    print("\nEste script vai ajudar a resolver problemas de codificação com PostgreSQL no Windows.")
    print("\nPassos que serão realizados:")
    
    print("\n1. Verificando se você tem o PostgreSQL instalado e configurado...")
    print("   - Você precisa ter o PostgreSQL instalado")
    print("   - O comando psql deve estar disponível no PATH")
    print("   - O usuário 'postgres' deve estar configurado corretamente")
    
    print("\n2. Para corrigir o erro de codificação UTF-8:")
    print("   a) Feche todas as conexões com o PostgreSQL")
    print("   b) Execute como administrador o seguinte comando no prompt:")
    print("      psql -U postgres -c \"DROP DATABASE IF EXISTS 4studio_db;\"")
    print("   c) Depois crie o banco novamente:")
    print("      psql -U postgres -c \"CREATE DATABASE 4studio_db ENCODING 'UTF8';\"")
    
    print("\n3. Depois de criar o banco, execute as migrações:")
    print("   python manage.py migrate")
    
    print("\n4. Se o problema persistir:")
    print("   - Verifique se o Windows está configurado para usar UTF-8")
    print("   - No Painel de Controle -> Região -> Configurações Administrativas")
    print("   - Altere o locale para Português (Brasil) e marque 'usar Unicode UTF-8'")
    print("   - Pode ser necessário reiniciar o computador")
    
    print("\nVocê também pode editar o arquivo settings.py manualmente e usar um banco de dados SQLite temporariamente:")
    print('''
# Configuração para SQLite em vez de PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
''')
    
    print("\nDeseja tentar criar o banco de dados novamente? (s/n)")
    try:
        resposta = input().strip().lower()
        if resposta == 's':
            print("\nTentando executar os comandos psql...")
            try:
                os.system('psql -U postgres -c "DROP DATABASE IF EXISTS 4studio_db;"')
                os.system('psql -U postgres -c "CREATE DATABASE 4studio_db ENCODING \'UTF8\';"')
                print("\nBanco de dados recriado. Execute 'python manage.py migrate' para aplicar as migrações.")
            except Exception as e:
                print(f"\nErro ao executar os comandos: {e}")
                print("Por favor, execute os comandos manualmente.")
    except:
        print("\nPor favor, execute os comandos manualmente como mostrado acima.")

if __name__ == "__main__":
    main()
