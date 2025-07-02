from django.contrib import admin
from .models import VoiceCategory, VoiceType, AudioSample, Testimonial, ContactRequest

@admin.register(VoiceCategory)
class VoiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(VoiceType)
class VoiceTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'is_ai', 'created_at')
    list_filter = ('gender', 'is_ai')
    search_fields = ('name',)

@admin.register(AudioSample)
class AudioSampleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'voice_type', 'duration', 'featured', 'created_at')
    list_filter = ('category', 'voice_type', 'featured')
    search_fields = ('title', 'description')
    date_hierarchy = 'created_at'

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'company', 'active', 'created_at')
    list_filter = ('active',)
    search_fields = ('client_name', 'company', 'quote')

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'company', 'service_type', 'contacted', 'created_at')
    list_filter = ('contacted', 'service_type', 'created_at')
    search_fields = ('name', 'email', 'phone', 'company', 'message')
    date_hierarchy = 'created_at'
