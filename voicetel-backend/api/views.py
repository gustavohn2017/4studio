from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import VoiceCategory, VoiceType, AudioSample, Testimonial, ContactRequest
from .serializers import (
    VoiceCategorySerializer,
    VoiceTypeSerializer,
    AudioSampleSerializer,
    TestimonialSerializer,
    ContactRequestSerializer
)
from .utils import send_contact_email

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
