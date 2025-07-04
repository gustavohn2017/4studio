from api.models import ContactRequest
import logging

logger = logging.getLogger(__name__)

class AdminPanelMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Add pending_requests_count to all admin panel views
        if request.path.startswith('/admin-panel/'):
            if request.user.is_authenticated:
                request.pending_requests_count = ContactRequest.objects.filter(contacted=False).count()
            else:
                # Usuário não autenticado tentando acessar o painel admin
                if request.path != '/login/' and not request.path.startswith('/static/'):
                    logger.debug(f"Tentativa de acesso não autenticado: {request.path}")
        
        response = self.get_response(request)
        return response
