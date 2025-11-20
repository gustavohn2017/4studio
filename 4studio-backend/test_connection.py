#!/usr/bin/env python
"""
Script de teste de conexão Backend + Banco de Dados
"""
import os
import sys
import django

# Configurar Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '4studio.settings')
django.setup()

from django.db import connection
from django.contrib.auth.models import User
from api.models import VoiceCategory, VoiceType, AudioSample, Testimonial, ContactRequest

def test_database_connection():
    """Testa a conexão com o banco de dados"""
    print("=" * 70)
    print("🔗 TESTE DE CONEXÃO - BACKEND + BANCO DE DADOS")
    print("=" * 70)
    print()
    
    try:
        # Teste 1: Conexão com banco
        print("📊 Teste 1: Verificando conexão com banco de dados...")
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
        print("✅ Banco de dados: CONECTADO")
        print(f"   Tipo: {connection.settings_dict['ENGINE'].split('.')[-1]}")
        print(f"   Nome: {connection.settings_dict.get('NAME', 'N/A')}")
        print()
        
        # Teste 2: Estatísticas
        print("📈 Teste 2: Coletando estatísticas...")
        stats = {
            'Categorias': VoiceCategory.objects.count(),
            'Tipos de Voz': VoiceType.objects.count(),
            'Amostras de Áudio': AudioSample.objects.count(),
            'Depoimentos': Testimonial.objects.count(),
            'Solicitações de Contato': ContactRequest.objects.count(),
            'Usuários': User.objects.count(),
        }
        
        for key, value in stats.items():
            print(f"   {key}: {value}")
        print()
        
        # Teste 3: Dados de exemplo
        print("📦 Teste 3: Verificando dados de exemplo...")
        
        categories = VoiceCategory.objects.all()[:3]
        if categories:
            print("   Categorias encontradas:")
            for cat in categories:
                print(f"      - ID: {cat.id}, Nome: {cat.name}")
        else:
            print("   ⚠️  Nenhuma categoria encontrada")
        
        print()
        
        testimonials = Testimonial.objects.all()[:3]
        if testimonials:
            print("   Depoimentos encontrados:")
            for test in testimonials:
                status = "✅ Ativo" if test.active else "❌ Inativo"
                print(f"      - ID: {test.id}, Cliente: {test.client_name}, Status: {status}")
        else:
            print("   ⚠️  Nenhum depoimento encontrado")
        
        print()
        
        # Resumo final
        print("=" * 70)
        print("✅ TESTE CONCLUÍDO COM SUCESSO!")
        print("=" * 70)
        print()
        print("🌐 URLs de Teste:")
        print("   Backend (HTML): http://localhost:8000/test-connection/")
        print("   API (JSON):     http://localhost:8000/api/test-connection/")
        print("   Frontend:       http://localhost:3000/test-connection")
        print()
        
        return True
        
    except Exception as e:
        print()
        print("=" * 70)
        print("❌ ERRO NO TESTE")
        print("=" * 70)
        print(f"Erro: {str(e)}")
        print()
        return False

if __name__ == "__main__":
    success = test_database_connection()
    sys.exit(0 if success else 1)
