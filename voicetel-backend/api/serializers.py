from rest_framework import serializers
from .models import VoiceCategory, VoiceType, AudioSample, Testimonial, ContactRequest

class VoiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceCategory
        fields = '__all__'

class VoiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceType
        fields = '__all__'

class AudioSampleSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    voice_type_name = serializers.ReadOnlyField(source='voice_type.name')
    voice_gender = serializers.ReadOnlyField(source='voice_type.get_gender_display')
    
    class Meta:
        model = AudioSample
        fields = ['id', 'title', 'description', 'audio_file', 'category', 
                 'category_name', 'voice_type', 'voice_type_name', 'voice_gender',
                 'duration', 'featured', 'created_at']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'client_name', 'company', 'quote', 'image']

class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ['name', 'email', 'phone', 'company', 'message', 'service_type', 'script_file']
