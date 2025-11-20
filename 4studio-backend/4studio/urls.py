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
from django.http import JsonResponse
from .views import test_connection_view

def health_check(request):
    """Health check endpoint para Railway"""
    return JsonResponse({"status": "ok", "message": "4Studio API is running"})

urlpatterns = [
    # Health check direto no root URLs
    path('health/', health_check, name='health'),
    
    # Redireciona a página inicial (/) para a tela de login do painel administrativo.
    path('', RedirectView.as_view(url='/admin-panel/login/', permanent=False), name='home-redirect'),
    
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