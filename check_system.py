import os
import sys
import requests
import time
import json
from urllib.parse import urljoin

# Configurações
BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3000"
API_ENDPOINTS = {
    "categories": "/api/categories/",
    "voice_types": "/api/voice-types/",
    "audio_samples": "/api/audio-samples/",
    "testimonials": "/api/testimonials/",
}

def print_header(message):
    """Imprime um cabeçalho formatado"""
    print("\n" + "=" * 60)
    print(" " + message)
    print("=" * 60)

def print_status(message, success=True):
    """Imprime status de teste"""
    status = "✓" if success else "✗"
    color = "\033[92m" if success else "\033[91m" # Verde ou vermelho
    print(f"{color}{status}\033[0m {message}")

def check_server_running(url, name):
    """Verifica se um servidor está rodando"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code < 500:  # Mesmo 404 é ok, significa que o servidor está rodando
            print_status(f"{name} está rodando em {url}")
            return True
        else:
            print_status(f"{name} parece estar com problemas. Status: {response.status_code}", False)
            return False
    except requests.exceptions.RequestException as e:
        print_status(f"{name} não está rodando em {url}. Erro: {str(e)}", False)
        return False

def test_api_endpoints():
    """Testa os endpoints da API"""
    print_header("Testando endpoints da API")
    
    all_success = True
    
    for name, endpoint in API_ENDPOINTS.items():
        try:
            url = urljoin(BACKEND_URL, endpoint)
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                count = len(data) if isinstance(data, list) else "N/A"
                print_status(f"Endpoint {endpoint} funcionando. Itens: {count}")
            else:
                print_status(f"Endpoint {endpoint} retornou status: {response.status_code}", False)
                all_success = False
                
        except requests.exceptions.RequestException as e:
            print_status(f"Erro ao acessar {endpoint}: {str(e)}", False)
            all_success = False
            
    return all_success

def check_database():
    """Verifica se o banco de dados está configurado corretamente"""
    print_header("Verificando banco de dados")
    
    try:
        url = urljoin(BACKEND_URL, API_ENDPOINTS["categories"])
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            if len(data) > 0:
                print_status(f"Banco de dados populado. Categorias encontradas: {len(data)}")
                return True
            else:
                print_status("Banco de dados sem dados de exemplo. Execute python create_sample_data.py", False)
                return False
        else:
            print_status(f"Erro ao verificar dados. Status: {response.status_code}", False)
            return False
            
    except requests.exceptions.RequestException as e:
        print_status(f"Erro ao verificar banco de dados: {str(e)}", False)
        return False

def main():
    """Função principal para verificar o status do sistema"""
    print_header("VERIFICAÇÃO DO SISTEMA 4STUDIO")
    
    # Verifica se os servidores estão rodando
    backend_running = check_server_running(BACKEND_URL, "Backend Django")
    frontend_running = check_server_running(FRONTEND_URL, "Frontend Next.js")
    
    if not backend_running:
        print("\n⚠️  O backend não está rodando. Inicie com: python manage.py runserver")
        return
    
    if not frontend_running:
        print("\n⚠️  O frontend não está rodando. Inicie com: npm run dev (no diretório 4studio-frontend)")
    
    # Testa API se o backend estiver rodando
    if backend_running:
        api_ok = test_api_endpoints()
        db_ok = check_database()
    
    # Resumo final
    print_header("RESUMO DO DIAGNÓSTICO")
    
    if backend_running and frontend_running and api_ok and db_ok:
        print("\n✅ O sistema está rodando corretamente!")
        print(f"- Frontend: {FRONTEND_URL}")
        print(f"- Backend: {BACKEND_URL}")
        print(f"- API: {BACKEND_URL}/api/")
        print(f"- Admin: {BACKEND_URL}/admin/")
    else:
        print("\n⚠️  Foram encontrados problemas no sistema. Verifique os detalhes acima.")
    
    print("\n")

if __name__ == "__main__":
    main()
