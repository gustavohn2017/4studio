from django.urls import path
from . import views

urlpatterns = [
    path('', views.admin_dashboard, name='admin_dashboard'),
    path('audio-manager/', views.audio_manager, name='audio_manager'),
    path('audio-upload/', views.audio_upload, name='audio_upload'),
    path('audio-edit/<int:audio_id>/', views.audio_edit, name='audio_edit'),
    path('audio-delete/<int:audio_id>/', views.audio_delete, name='audio_delete'),
    path('testimonials/', views.testimonials_manager, name='testimonials_manager'),
    path('testimonial-add/', views.testimonial_add, name='testimonial_create'),
    path('testimonial-edit/<int:testimonial_id>/', views.testimonial_edit, name='testimonial_edit'),
    path('testimonial-delete/<int:testimonial_id>/', views.testimonial_delete, name='testimonial_delete'),
    path('contact-requests/', views.contact_requests, name='contact_requests'),
    path('contact-request/<int:request_id>/', views.contact_request_detail, name='contact_request_detail'),
    path('mark-contacted/<int:request_id>/', views.mark_contacted, name='mark_contacted'),
    path('categories/', views.category_manager, name='category_manager'),
    path('voice-types/', views.voice_type_manager, name='voice_type_manager'),
]
