"""
URL configuration for voicetel project.

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
from django.contrib.auth import views as auth_views
from .views import api_root_view, HomeTemplateView

urlpatterns = [
    # APIs e painéis admin
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('admin-panel/', include('admin_panel.urls')),
      # Authentication URLs com segurança aprimorada
    path('login/', auth_views.LoginView.as_view(
        template_name='admin_panel/login.html',
        redirect_authenticated_user=True,
    ), name='login'),
    path('logout/', auth_views.LogoutView.as_view(
        next_page='login',
        extra_context={'message': 'Você saiu do sistema com segurança.'}
    ), name='logout'),
    path('senha/', auth_views.PasswordChangeView.as_view(
        template_name='admin_panel/password_change.html',
        success_url='/senha/sucesso/'
    ), name='password_change'),
    path('senha/sucesso/', auth_views.PasswordChangeDoneView.as_view(
        template_name='admin_panel/password_change_done.html'
    ), name='password_change_done'),
    
    # Página inicial do backend
    path('', HomeTemplateView.as_view(), name='home'),
    path('api-info/', api_root_view, name='api-info'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
