from django import forms
from api.models import AudioSample, VoiceCategory, VoiceType, Testimonial
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.utils.translation import gettext_lazy as _

class AdminPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        label=_("E-mail"),
        max_length=254,
        widget=forms.EmailInput(attrs={
            'class': 'block w-full rounded-lg border border-gray-700 bg-dark-800/50 pl-10 pr-4 py-3 text-gray-200 placeholder-gray-500 backdrop-blur-sm transition-colors duration-200 focus:border-primary-500 focus:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'placeholder': 'seu@email.com',
            'autocomplete': 'email'
        })
    )

class AdminSetPasswordForm(SetPasswordForm):
    new_password1 = forms.CharField(
        label=_("Nova senha"),
        widget=forms.PasswordInput(attrs={
            'class': 'block w-full rounded-lg border border-gray-700 bg-dark-800/50 pl-10 pr-4 py-3 text-gray-200 placeholder-gray-500 backdrop-blur-sm transition-colors duration-200 focus:border-primary-500 focus:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'placeholder': '••••••••',
            'autocomplete': 'new-password'
        }),
        strip=False,
    )
    new_password2 = forms.CharField(
        label=_("Confirmar nova senha"),
        strip=False,
        widget=forms.PasswordInput(attrs={
            'class': 'block w-full rounded-lg border border-gray-700 bg-dark-800/50 pl-10 pr-4 py-3 text-gray-200 placeholder-gray-500 backdrop-blur-sm transition-colors duration-200 focus:border-primary-500 focus:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'placeholder': '••••••••',
            'autocomplete': 'new-password'
        }),
    )

class AudioSampleForm(forms.ModelForm):
    class Meta:
        model = AudioSample
        fields = ['title', 'description', 'audio_file', 'category', 'voice_type', 'duration', 'featured']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'input-modern w-full'}),
            'description': forms.Textarea(attrs={'class': 'input-modern w-full', 'rows': 3}),
            'audio_file': forms.FileInput(attrs={'class': 'input-modern file-input w-full'}),
            'category': forms.Select(attrs={'class': 'select-modern w-full'}),
            'voice_type': forms.Select(attrs={'class': 'select-modern w-full'}),
            'duration': forms.TimeInput(attrs={'class': 'input-modern w-full', 'type': 'time', 'step': '1'}),
            'featured': forms.CheckboxInput(attrs={'class': 'checkbox-modern'}),
        }

class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['client_name', 'company', 'quote', 'image', 'active']
        widgets = {
            'client_name': forms.TextInput(attrs={'class': 'input-modern w-full'}),
            'company': forms.TextInput(attrs={'class': 'input-modern w-full'}),
            'quote': forms.Textarea(attrs={'class': 'input-modern w-full', 'rows': 4}),
            'image': forms.FileInput(attrs={'class': 'input-modern file-input w-full'}),
            'active': forms.CheckboxInput(attrs={'class': 'checkbox-modern'}),
        }

class VoiceCategoryForm(forms.ModelForm):
    class Meta:
        model = VoiceCategory
        fields = ['name', 'description', 'slug']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input-modern w-full'}),
            'slug': forms.TextInput(attrs={'class': 'input-modern w-full'}),
            'description': forms.Textarea(attrs={'class': 'input-modern w-full', 'rows': 3}),
        }

class VoiceTypeForm(forms.ModelForm):
    class Meta:
        model = VoiceType
        fields = ['name', 'gender', 'is_ai']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input-modern w-full'}),
            'gender': forms.Select(attrs={'class': 'select-modern w-full'}),
            'is_ai': forms.CheckboxInput(attrs={'class': 'checkbox-modern'}),
        }


class AdminPasswordResetForm(PasswordResetForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # estiliza o campo de e-mail
        self.fields['email'].widget.attrs.update({
            'class': 'input-modern w-full',
            'placeholder': 'seu@email.com'
        })


class AdminSetPasswordForm(SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['new_password1'].widget.attrs.update({'class': 'input-modern w-full', 'placeholder': 'Nova senha'})
        self.fields['new_password2'].widget.attrs.update({'class': 'input-modern w-full', 'placeholder': 'Confirme a nova senha'})
