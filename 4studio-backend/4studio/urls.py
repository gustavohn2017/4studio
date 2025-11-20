"""
URL configuration for 4Studio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from django.http import JsonResponse, HttpResponse
from .views import test_connection_view

def health_check(request):
    """Health check endpoint para Railway"""
    return JsonResponse({
        "status": "ok", 
        "message": "4Studio API is running",
        "django_settings": settings.SETTINGS_MODULE,
        "debug": settings.DEBUG,
        "allowed_hosts": settings.ALLOWED_HOSTS
    })

def root_view(request):
    """View de teste para a raiz"""
    return HttpResponse("""
        <h1>4Studio Backend está funcionando!</h1>
        <p>Endpoints disponíveis:</p>
        <ul>
            <li><a href="/health/">/health/</a> - Health check</li>
            <li><a href="/admin/">/admin/</a> - Django Admin</li>
            <li><a href="/admin-panel/">/admin-panel/</a> - Painel Administrativo</li>
            <li><a href="/api/">/api/</a> - API REST</li>
        </ul>
    """)

urlpatterns = [
    # Health check direto no root URLs
    path('health/', health_check, name='health'),
    
    # Página inicial de teste
    path('', root_view, name='home'),
    
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # Página de teste de conexão
    path('test-connection/', test_connection_view, name='test_connection'),
    
    # Inclui TODAS as URLs do painel administrativo sob o prefixo /admin-panel/
    # Isso inclui dashboard, login, logout, recuperação de senha, etc.
    path('admin-panel/', include('admin_panel.urls', namespace='admin_panel')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)