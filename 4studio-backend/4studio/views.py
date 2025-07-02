from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.generic import TemplateView
from django.conf import settings

def api_root_view(request):
    """
    View para a página inicial do backend.
    Retorna informações básicas sobre a API ou redireciona para o frontend.
    """
    # Opção 1: Retornar uma resposta JSON com informações da API
    response_data = {
        "name": "4Studio API",
        "version": "1.0.0",
        "description": "API para gerenciamento de locuções, URA e amostras de áudio",
        "endpoints": {
            "api": "/api/",
            "admin": "/admin/",
            "admin_panel": "/admin-panel/",
        },
        "frontend": "http://localhost:3000"
    }
    return JsonResponse(response_data)

class HomeTemplateView(TemplateView):
    """
    View baseada em template para a página inicial.
    Alternativa à view baseada em função acima.
    """
    template_name = "home.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["api_version"] = "1.0.0"
        context["frontend_url"] = "http://localhost:3000"
        return context
