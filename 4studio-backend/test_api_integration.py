#!/usr/bin/env python
"""
Script para testar a API do backend Django
Testa endpoints principais e verifica respostas
"""
import requests
import json
import sys

BASE_URL = "http://localhost:8000/api"

def test_endpoint(name, url, method='GET', data=None):
    """Testa um endpoint da API"""
    print(f"\n{'='*60}")
    print(f"Testando: {name}")
    print(f"URL: {url}")
    print(f"Método: {method}")
    
    try:
        if method == 'GET':
            response = requests.get(url, timeout=5)
        elif method == 'POST':
            response = requests.post(url, json=data, timeout=5)
        else:
            print(f"❌ Método {method} não suportado")
            return False
        
        print(f"Status: {response.status_code}")
        
        if response.status_code in [200, 201]:
            try:
                data = response.json()
                if isinstance(data, list):
                    print(f"✅ Sucesso! Retornou {len(data)} itens")
                    if data:
                        print(f"Exemplo do primeiro item:")
                        print(json.dumps(data[0], indent=2, ensure_ascii=False)[:300] + "...")
                else:
                    print(f"✅ Sucesso! Resposta:")
                    print(json.dumps(data, indent=2, ensure_ascii=False)[:500])
                return True
            except:
                print(f"✅ Sucesso! Resposta não JSON")
                return True
        else:
            print(f"❌ Erro: {response.status_code}")
            try:
                print(f"Resposta: {response.json()}")
            except:
                print(f"Resposta: {response.text[:200]}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Erro: Não foi possível conectar ao servidor")
        print("Certifique-se de que o servidor Django está rodando em http://localhost:8000")
        return False
    except Exception as e:
        print(f"❌ Erro: {str(e)}")
        return False

def main():
    print("="*60)
    print("TESTE DE INTEGRAÇÃO FRONTEND-BACKEND")
    print("4Studio - Django REST API")
    print("="*60)
    
    tests = []
    
    # Teste 1: Health Check
    tests.append(test_endpoint(
        "Health Check",
        f"{BASE_URL}/health/"
    ))
    
    # Teste 2: Test Connection (verifica banco de dados)
    tests.append(test_endpoint(
        "Test Connection (Database)",
        f"{BASE_URL}/test-connection/"
    ))
    
    # Teste 3: Categorias de Voz
    tests.append(test_endpoint(
        "Voice Categories",
        f"{BASE_URL}/categories/"
    ))
    
    # Teste 4: Tipos de Voz
    tests.append(test_endpoint(
        "Voice Types",
        f"{BASE_URL}/voice-types/"
    ))
    
    # Teste 5: Amostras de Áudio
    tests.append(test_endpoint(
        "Audio Samples",
        f"{BASE_URL}/audio-samples/"
    ))
    
    # Teste 6: Amostras em Destaque
    tests.append(test_endpoint(
        "Featured Audio Samples",
        f"{BASE_URL}/audio-samples/featured/"
    ))
    
    # Teste 7: Depoimentos
    tests.append(test_endpoint(
        "Testimonials",
        f"{BASE_URL}/testimonials/"
    ))
    
    # Resumo dos testes
    print(f"\n{'='*60}")
    print("RESUMO DOS TESTES")
    print(f"{'='*60}")
    total = len(tests)
    passed = sum(tests)
    failed = total - passed
    
    print(f"Total de testes: {total}")
    print(f"✅ Passou: {passed}")
    print(f"❌ Falhou: {failed}")
    print(f"Taxa de sucesso: {(passed/total*100):.1f}%")
    
    if failed == 0:
        print("\n🎉 Todos os testes passaram! Backend está funcionando perfeitamente!")
        return 0
    else:
        print(f"\n⚠️  {failed} teste(s) falharam. Verifique os erros acima.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
