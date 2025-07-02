from django.db import models
from django.utils.text import slugify

class VoiceCategory(models.Model):
    """Categories for voice recordings (e.g. URA, Espera Telefônica, etc)"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = "Categoria de Voz"
        verbose_name_plural = "Categorias de Voz"
        ordering = ['name']
    
    def __str__(self):
        return self.name

class VoiceType(models.Model):
    """Types of voices (e.g. Male, Female, AI)"""
    GENDER_CHOICES = (
        ('male', 'Masculino'),
        ('female', 'Feminino'),
        ('ai', 'Inteligência Artificial'),
    )
    
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    is_ai = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Tipo de Voz"
        verbose_name_plural = "Tipos de Voz"
    
    def __str__(self):
        return f"{self.name} ({self.get_gender_display()})"

class AudioSample(models.Model):
    """Audio samples for demonstration on the website"""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    audio_file = models.FileField(upload_to='audio/samples/')
    category = models.ForeignKey(VoiceCategory, on_delete=models.CASCADE, related_name='audio_samples')
    voice_type = models.ForeignKey(VoiceType, on_delete=models.CASCADE, related_name='audio_samples')
    duration = models.DurationField(null=True, blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Amostra de Áudio"
        verbose_name_plural = "Amostras de Áudio"
        ordering = ['-featured', '-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.voice_type}"

class Testimonial(models.Model):
    """Client testimonials"""
    client_name = models.CharField(max_length=100)
    company = models.CharField(max_length=200, blank=True)
    quote = models.TextField()
    image = models.ImageField(upload_to='images/testimonials/', blank=True, null=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Depoimento"
        verbose_name_plural = "Depoimentos"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.company}"

class ContactRequest(models.Model):
    """Contact requests from the website form"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    company = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    service_type = models.ForeignKey(VoiceCategory, on_delete=models.SET_NULL, null=True, blank=True)
    script_file = models.FileField(upload_to='uploads/scripts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    contacted = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = "Solicitação de Contato"
        verbose_name_plural = "Solicitações de Contato"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.email} - {self.created_at.strftime('%d/%m/%Y')}"
