from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    VoiceCategoryViewSet,
    VoiceTypeViewSet,
    AudioSampleViewSet,
    TestimonialViewSet,
    ContactRequestViewSet,
    health_check,
    test_connection
)

router = DefaultRouter()
router.register(r'categories', VoiceCategoryViewSet)
router.register(r'voice-types', VoiceTypeViewSet)
router.register(r'audio-samples', AudioSampleViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'contact-requests', ContactRequestViewSet)  # Updated to match frontend expectation

urlpatterns = [
    path('', include(router.urls)),
    path('health/', health_check, name='health_check'),
    path('test-connection/', test_connection, name='test_connection'),
]
