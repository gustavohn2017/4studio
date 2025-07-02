from django import forms
from api.models import AudioSample, VoiceCategory, VoiceType, Testimonial

class AudioSampleForm(forms.ModelForm):
    class Meta:
        model = AudioSample
        fields = ['title', 'description', 'audio_file', 'category', 'voice_type', 'duration', 'featured']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'category': forms.Select(attrs={'class': 'form-select'}),
            'voice_type': forms.Select(attrs={'class': 'form-select'}),
            'duration': forms.TimeInput(attrs={'class': 'form-control', 'type': 'time', 'step': '1'}),
            'featured': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['client_name', 'company', 'quote', 'image', 'active']
        widgets = {
            'client_name': forms.TextInput(attrs={'class': 'form-control'}),
            'company': forms.TextInput(attrs={'class': 'form-control'}),
            'quote': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
            'active': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class VoiceCategoryForm(forms.ModelForm):
    class Meta:
        model = VoiceCategory
        fields = ['name', 'description', 'slug']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'slug': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

class VoiceTypeForm(forms.ModelForm):
    class Meta:
        model = VoiceType
        fields = ['name', 'gender', 'is_ai']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'gender': forms.Select(attrs={'class': 'form-select'}),
            'is_ai': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
