from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import connection
from django.contrib.auth.models import User
from .models import VoiceCategory, VoiceType, AudioSample, Testimonial, ContactRequest
from .serializers import (
    VoiceCategorySerializer,
    VoiceTypeSerializer,
    AudioSampleSerializer,
    TestimonialSerializer,
    ContactRequestSerializer
)
from .utils import send_contact_email

@api_view(['GET'])
def health_check(request):
    """Endpoint para verificação de saúde da API"""
    return Response({"status": "ok"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def test_connection(request):
    """Endpoint para testar conexão completa: API + Banco de Dados"""
    try:
        # Teste 1: Verificar conexão com banco de dados
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_status = "connected"
        
        # Teste 2: Contar registros em cada tabela
        categories_count = VoiceCategory.objects.count()
        voice_types_count = VoiceType.objects.count()
        audio_samples_count = AudioSample.objects.count()
        testimonials_count = Testimonial.objects.count()
        contacts_count = ContactRequest.objects.count()
        users_count = User.objects.count()
        
        # Teste 3: Buscar alguns dados de exemplo
        latest_categories = VoiceCategory.objects.all()[:3].values('id', 'name')
        latest_testimonials = Testimonial.objects.all()[:3].values('id', 'client_name', 'active')
        
        return Response({
            "status": "success",
            "message": "Backend e banco de dados funcionando perfeitamente! ✅",
            "database": {
                "status": db_status,
                "type": connection.settings_dict['ENGINE'].split('.')[-1]
            },
            "statistics": {
                "categories": categories_count,
                "voice_types": voice_types_count,
                "audio_samples": audio_samples_count,
                "testimonials": testimonials_count,
                "contact_requests": contacts_count,
                "users": users_count
            },
            "samples": {
                "categories": list(latest_categories),
                "testimonials": list(latest_testimonials)
            },
            "timestamp": request.META.get('HTTP_DATE', 'N/A')
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            "status": "error",
            "message": f"Erro na conexão: {str(e)}",
            "database": {
                "status": "disconnected"
            }
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VoiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Endpoint da API para categorias de voz"""
    queryset = VoiceCategory.objects.all()
    serializer_class = VoiceCategorySerializer
    
    @action(detail=True, methods=['get'])
    def audio_samples(self, request, pk=None):
        """Obter amostras de áudio para uma categoria específica"""
        category = self.get_object()
        samples = category.audio_samples.all()
        serializer = AudioSampleSerializer(samples, many=True)
        return Response(serializer.data)

class VoiceTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """Endpoint da API para tipos de voz"""
    queryset = VoiceType.objects.all()
    serializer_class = VoiceTypeSerializer
    
    @action(detail=True, methods=['get'])
    def audio_samples(self, request, pk=None):
        """Obter amostras de áudio para um tipo de voz específico"""
        voice_type = self.get_object()
        samples = voice_type.audio_samples.all()
        serializer = AudioSampleSerializer(samples, many=True)
        return Response(serializer.data)

class AudioSampleViewSet(viewsets.ReadOnlyModelViewSet):
    """Endpoint da API para amostras de áudio"""
    queryset = AudioSample.objects.all()
    serializer_class = AudioSampleSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Obter amostras de áudio em destaque"""
        featured = AudioSample.objects.filter(featured=True)
        serializer = AudioSampleSerializer(featured, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Obter amostras de áudio filtradas por categoria"""
        category_slug = request.query_params.get('slug', None)
        if category_slug:
            category = get_object_or_404(VoiceCategory, slug=category_slug)
            samples = AudioSample.objects.filter(category=category)
            serializer = AudioSampleSerializer(samples, many=True)
            return Response(serializer.data)
        return Response(
            {"detail": "O parâmetro slug da categoria é obrigatório"},
            status=status.HTTP_400_BAD_REQUEST
        )

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """Endpoint da API para depoimentos"""
    queryset = Testimonial.objects.filter(active=True)
    serializer_class = TestimonialSerializer

class ContactRequestViewSet(viewsets.ModelViewSet):
    """Endpoint da API para envio de solicitações de contato"""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post']  # Only allow POST requests for contact form
    
    def create(self, request, *args, **kwargs):
        """Criar uma nova solicitação de contato e enviar e-mails de notificação"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_request = serializer.save()
        
        # Send email notification
        email_sent = send_contact_email(contact_request)
        
        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data
        response_data['email_sent'] = email_sent
        
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
