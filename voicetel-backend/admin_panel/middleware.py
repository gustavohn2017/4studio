from api.models import ContactRequest

class AdminPanelMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Add pending_requests_count to all admin panel views
        if request.path.startswith('/admin-panel/') and request.user.is_authenticated:
            request.pending_requests_count = ContactRequest.objects.filter(contacted=False).count()
        
        response = self.get_response(request)
        return response
