"""
URL configuration for 4Studio project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from .views import test_connection_view
from .create_admin_view import create_superuser_view

def health_check(request):
    """Health check endpoint para Railway"""
    return JsonResponse({
        "status": "ok", 
        "message": "4Studio API is running",
        "django_settings": settings.SETTINGS_MODULE,
        "debug": settings.DEBUG,
        "allowed_hosts": settings.ALLOWED_HOSTS
    })

def accounts_login_redirect(request):
    """Redireciona /accounts/login/ para /admin-panel/login/"""
    next_url = request.GET.get('next', '/admin-panel/')
    return redirect(f'/admin-panel/login/?next={next_url}')

def root_view(request):
    """View de teste para a raiz"""
    return HttpResponse("""
        <!DOCTYPE html>
        <html>
        <head>
            <title>4Studio Backend</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #333;
                    border-bottom: 2px solid #4CAF50;
                    padding-bottom: 10px;
                }
                .endpoints {
                    list-style: none;
                    padding: 0;
                }
                .endpoints li {
                    margin: 15px 0;
                    padding: 10px;
                    background: #f9f9f9;
                    border-left: 4px solid #4CAF50;
                }
                .endpoints a {
                    color: #4CAF50;
                    text-decoration: none;
                    font-weight: bold;
                }
                .endpoints a:hover {
                    text-decoration: underline;
                }
                .description {
                    color: #666;
                    font-size: 14px;
                    margin-top: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🎙️ 4Studio Backend está funcionando!</h1>
                <p>Escolha um dos endpoints abaixo:</p>
                <ul class="endpoints">
                    <li>
                        <a href="/health/">/health/</a>
                        <div class="description">Health check e status do sistema</div>
                    </li>
                    <li>
                        <a href="/create-admin/">/create-admin/</a>
                        <div class="description">🔐 Criar Superuser (temporário - remover após uso)</div>
                    </li>
                    <li>
                        <a href="/admin/">/admin/</a>
                        <div class="description">Django Admin nativo</div>
                    </li>
                    <li>
                        <a href="/admin-panel/login/">/admin-panel/</a>
                        <div class="description">Painel Administrativo customizado</div>
                    </li>
                    <li>
                        <a href="/api/">/api/</a>
                        <div class="description">API REST endpoints</div>
                    </li>
                </ul>
            </div>
        </body>
        </html>
    """)

urlpatterns = [
    # Health check
    path('health/', health_check, name='health'),
    
    # Redirecionar /accounts/login/ para /admin-panel/login/
    path('accounts/login/', accounts_login_redirect, name='accounts_login'),
    
    # View temporária para criar superuser
    path('create-admin/', create_superuser_view, name='create_superuser'),
    
    # Página inicial
    path('', root_view, name='home'),
    
    # Django Admin nativo
    path('admin/', admin.site.urls),
    
    # API REST
    path('api/', include('api.urls')),
    
    # Página de teste de conexão
    path('test-connection/', test_connection_view, name='test_connection'),
    
    # Painel Administrativo customizado
    path('admin-panel/', include(('admin_panel.urls', 'admin_panel'), namespace='admin_panel')),
]

# Arquivos estáticos e media (apenas em DEBUG)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)