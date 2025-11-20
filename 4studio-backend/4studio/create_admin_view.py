"""
View temporária para criar superuser via browser
"""
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import json

User = get_user_model()

@csrf_exempt
def create_superuser_view(request):
    """
    Acesse: https://4studio-production.up.railway.app/create-admin/
    
    GET: Mostra formulário HTML
    POST: Cria o superuser
    """
    
    if request.method == 'GET':
        return HttpResponse("""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Criar Superuser - 4Studio</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 500px;
                    margin: 50px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .form-container {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #333;
                    margin-bottom: 30px;
                }
                input {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                button {
                    background: #4CAF50;
                    color: white;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                    font-size: 16px;
                    margin-top: 10px;
                }
                button:hover {
                    background: #45a049;
                }
                .result {
                    margin-top: 20px;
                    padding: 15px;
                    border-radius: 4px;
                    display: none;
                }
                .success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .error {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h1>🔐 Criar Superuser</h1>
                <form id="createForm">
                    <input type="text" id="username" placeholder="Username" value="admin" required>
                    <input type="email" id="email" placeholder="Email" value="admin@4studio.com" required>
                    <input type="password" id="password" placeholder="Password" required>
                    <button type="submit">Criar Superuser</button>
                </form>
                <div id="result" class="result"></div>
            </div>
            
            <script>
                document.getElementById('createForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const resultDiv = document.getElementById('result');
                    const data = {
                        username: document.getElementById('username').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
                    };
                    
                    try {
                        const response = await fetch('/create-admin/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        });
                        
                        const result = await response.json();
                        
                        resultDiv.style.display = 'block';
                        if (result.success) {
                            resultDiv.className = 'result success';
                            resultDiv.innerHTML = `
                                ✅ ${result.message}<br><br>
                                <strong>Username:</strong> ${result.username}<br>
                                <strong>Email:</strong> ${result.email}<br><br>
                                <a href="/admin/" style="color: #155724; font-weight: bold;">
                                    Ir para Django Admin →
                                </a>
                            `;
                        } else {
                            resultDiv.className = 'result error';
                            resultDiv.innerHTML = `❌ ${result.message}`;
                        }
                    } catch (error) {
                        resultDiv.style.display = 'block';
                        resultDiv.className = 'result error';
                        resultDiv.innerHTML = `❌ Erro: ${error.message}`;
                    }
                });
            </script>
        </body>
        </html>
        """)
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username', '').strip()
            email = data.get('email', '').strip()
            password = data.get('password', '').strip()
            
            if not username or not password:
                return JsonResponse({
                    'success': False,
                    'message': 'Username e password são obrigatórios!'
                })
            
            # Verificar se já existe
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
                user.set_password(password)
                user.email = email
                user.is_superuser = True
                user.is_staff = True
                user.save()
                
                return JsonResponse({
                    'success': True,
                    'message': f'Superuser "{username}" atualizado com sucesso!',
                    'username': username,
                    'email': email
                })
            else:
                user = User.objects.create_superuser(
                    username=username,
                    email=email,
                    password=password
                )
                
                return JsonResponse({
                    'success': True,
                    'message': f'Superuser "{username}" criado com sucesso!',
                    'username': username,
                    'email': email
                })
                
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Erro ao criar superuser: {str(e)}'
            })
    
    return JsonResponse({'success': False, 'message': 'Método não permitido'})
