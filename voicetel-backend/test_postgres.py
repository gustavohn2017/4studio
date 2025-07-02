"""
Script para testar diretamente a conexão com o PostgreSQL
usando psycopg2 sem passar pelo Django
"""
import psycopg2

def test_connection():
    try:
        # Conectar ao PostgreSQL
        conn = psycopg2.connect(
            dbname="postgres",
            user="postgres",
            password="postgres",
            host="localhost",
            port="5432"
        )
        
        # Definir a conexão como auto-commit
        conn.autocommit = True
        
        # Criar um cursor
        cursor = conn.cursor()
        
        # Verificar encoding atual
        cursor.execute("SHOW client_encoding;")
        print(f"Codificação atual: {cursor.fetchone()[0]}")
        
        # Definir codificação UTF-8
        cursor.execute("SET client_encoding TO 'UTF8';")
        print("Codificação alterada para UTF8")
        
        # Verificar novamente
        cursor.execute("SHOW client_encoding;")
        print(f"Nova codificação: {cursor.fetchone()[0]}")
        
        # Tentar recriar o banco de dados
        print("\nTentando recriar o banco de dados voicetel_db...")
        
        # Encerrar conexões ativas
        cursor.execute("""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = 'voicetel_db'
            AND pid <> pg_backend_pid();
        """)
        
        # Dropar o banco se existir
        cursor.execute("DROP DATABASE IF EXISTS voicetel_db;")
        print("Banco de dados removido")
        
        # Criar novo banco com codificação UTF-8
        cursor.execute("CREATE DATABASE voicetel_db WITH ENCODING 'UTF8';")
        print("Banco de dados recriado com codificação UTF8")
        
        # Fechar a conexão original
        cursor.close()
        conn.close()
        
        # Conectar ao novo banco voicetel_db
        conn = psycopg2.connect(
            dbname="voicetel_db",
            user="postgres",
            password="postgres",
            host="localhost",
            port="5432"
        )
        cursor = conn.cursor()
        
        # Verificar codificação no novo banco
        cursor.execute("SHOW client_encoding;")
        print(f"\nCodificação no novo banco: {cursor.fetchone()[0]}")
        
        # Verificar codificação do servidor
        cursor.execute("SHOW server_encoding;")
        print(f"Codificação do servidor: {cursor.fetchone()[0]}")
        
        print("\nTeste concluído com sucesso!")
        print("Agora execute 'python manage.py migrate' para criar as tabelas no banco de dados")
        
    except Exception as e:
        print(f"Erro: {e}")
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    test_connection()
