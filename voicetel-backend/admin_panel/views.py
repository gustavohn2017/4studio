from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.http import JsonResponse, HttpResponseForbidden
from api.models import VoiceCategory, VoiceType, AudioSample, Testimonial, ContactRequest
from django.db.models import Count, Q
from datetime import datetime, timedelta
from .forms import AudioSampleForm, TestimonialForm
from django.contrib.auth.views import LoginView
from django.core.cache import cache
from django.utils.translation import gettext as _

# Função para tratamento de falhas CSRF
def csrf_failure_view(request, reason=""):
    return render(request, 'admin_panel/csrf_error.html', {
        'error_message': _('Detectamos um problema de segurança com seu formulário. '
                           'Por favor, tente novamente. Se o problema persistir, '
                           'limpe seu cache de navegador e tente novamente.')
    }, status=403)

# Classe personalizada para o login com bloqueio de tentativas
class SecureLoginView(LoginView):
    template_name = 'admin_panel/login.html'
    
    def form_invalid(self, form):
        # Registra tentativas falhas para prevenção de força bruta
        username = self.request.POST.get('username', '')
        if username:
            key = f"login_attempts_{username}"
            attempts = cache.get(key, 0)
            cache.set(key, attempts + 1, 300)  # Armazena por 5 minutos
            
            # Se houver mais de 5 tentativas, bloqueia por um período
            if attempts >= 5:
                messages.error(self.request, _('Muitas tentativas de login. Por favor, tente novamente após 5 minutos.'))
                return HttpResponseForbidden(_('Muitas tentativas de login. Por favor, tente novamente após 5 minutos.'))
        
        return super().form_invalid(form)

    def form_valid(self, form):
        # Limpa o contador de tentativas quando o login for bem-sucedido
        username = form.cleaned_data.get('username')
        cache.delete(f"login_attempts_{username}")
        return super().form_valid(form)

@login_required
def admin_dashboard(request):
    """Admin dashboard with overview statistics"""
    context = {
        'audio_count': AudioSample.objects.count(),
        'categories': VoiceCategory.objects.annotate(samples_count=Count('audio_samples')),
        'voice_types': VoiceType.objects.annotate(samples_count=Count('audio_samples')),
        'recent_audio': AudioSample.objects.order_by('-created_at')[:5],
        'testimonials_count': Testimonial.objects.count(),
        'active_testimonials': Testimonial.objects.filter(active=True).count(),
        'contact_requests': ContactRequest.objects.count(),
        'pending_requests': ContactRequest.objects.filter(contacted=False).count(),
    }
    return render(request, 'admin_panel/dashboard.html', context)

@login_required
def audio_manager(request):
    """Manage audio samples"""
    # Apply filters if provided
    audio_samples = AudioSample.objects.all().order_by('-created_at')
    
    # Filter by category
    category_id = request.GET.get('category')
    if category_id:
        try:
            audio_samples = audio_samples.filter(category_id=int(category_id))
        except (ValueError, TypeError):
            pass
    
    # Filter by voice type
    voice_type_id = request.GET.get('voice_type')
    if voice_type_id:
        try:
            audio_samples = audio_samples.filter(voice_type_id=int(voice_type_id))
        except (ValueError, TypeError):
            pass
    
    # Pagination
    from django.core.paginator import Paginator
    paginator = Paginator(audio_samples, 12)  # Show 12 audio samples per page
    page = request.GET.get('page', 1)
    try:
        audio_samples = paginator.page(page)
    except:
        audio_samples = paginator.page(1)
    
    context = {
        'audio_samples': audio_samples,
        'categories': VoiceCategory.objects.all(),
        'voice_types': VoiceType.objects.all(),
    }
    return render(request, 'admin_panel/audio_manager.html', context)

@login_required
def audio_upload(request):
    """Upload new audio samples"""
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        category_id = request.POST.get('category')
        voice_type_id = request.POST.get('voice_type')
        featured = bool(request.POST.get('featured', False))
        audio_file = request.FILES.get('audio_file')
        
        if title and audio_file and category_id and voice_type_id:
            try:
                category = VoiceCategory.objects.get(id=category_id)
                voice_type = VoiceType.objects.get(id=voice_type_id)
                
                AudioSample.objects.create(
                    title=title,
                    description=description,
                    category=category,
                    voice_type=voice_type,
                    featured=featured,
                    audio_file=audio_file,
                )
                messages.success(request, 'Áudio adicionado com sucesso!')
                return redirect('audio_manager')
                
            except Exception as e:
                messages.error(request, f'Erro ao adicionar áudio: {str(e)}')
        else:
            messages.error(request, 'Por favor, preencha todos os campos obrigatórios.')
    
    context = {
        'categories': VoiceCategory.objects.all(),
        'voice_types': VoiceType.objects.all(),
    }
    return render(request, 'admin_panel/audio_form.html', context)

@login_required
def audio_edit(request, audio_id):
    """Edit existing audio sample"""
    audio = get_object_or_404(AudioSample, id=audio_id)
    
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        category_id = request.POST.get('category')
        voice_type_id = request.POST.get('voice_type')
        featured = bool(request.POST.get('featured', False))
        
        if title and category_id and voice_type_id:
            try:
                category = VoiceCategory.objects.get(id=category_id)
                voice_type = VoiceType.objects.get(id=voice_type_id)
                
                audio.title = title
                audio.description = description
                audio.category = category
                audio.voice_type = voice_type
                audio.featured = featured
                
                if 'audio_file' in request.FILES:
                    audio.audio_file = request.FILES['audio_file']
                
                audio.save()
                messages.success(request, 'Áudio atualizado com sucesso!')
                return redirect('audio_manager')
                
            except Exception as e:
                messages.error(request, f'Erro ao atualizar áudio: {str(e)}')
        else:
            messages.error(request, 'Por favor, preencha todos os campos obrigatórios.')
    
    context = {
        'audio': audio,
        'categories': VoiceCategory.objects.all(),
        'voice_types': VoiceType.objects.all(),
    }
    return render(request, 'admin_panel/audio_form.html', context)

@login_required
def audio_delete(request, audio_id):
    """Delete audio sample"""
    audio = get_object_or_404(AudioSample, id=audio_id)
    
    if request.method == 'POST':
        audio.delete()
        messages.success(request, 'Áudio excluído com sucesso!')
        return redirect('audio_manager')
    
    context = {'audio': audio}
    return render(request, 'admin_panel/audio_delete.html', context)

@login_required
def testimonials_manager(request):
    """Manage testimonials"""
    testimonials = Testimonial.objects.all().order_by('-created_at')
    active_count = testimonials.filter(active=True).count()
    context = {
        'testimonials': testimonials,
        'active_count': active_count,
    }
    return render(request, 'admin_panel/testimonials_manager.html', context)

@login_required
def testimonial_add(request):
    """Add new testimonial"""
    if request.method == 'POST':
        client_name = request.POST.get('client_name')
        company = request.POST.get('company')
        quote = request.POST.get('quote')
        active = bool(request.POST.get('active', False))
        
        if client_name and quote:
            try:
                testimonial = Testimonial(
                    client_name=client_name,
                    company=company,
                    quote=quote,
                    active=active,
                )
                
                if 'image' in request.FILES:
                    testimonial.image = request.FILES['image']
                    
                testimonial.save()
                messages.success(request, 'Depoimento adicionado com sucesso!')
                return redirect('testimonials_manager')
                
            except Exception as e:
                messages.error(request, f'Erro ao adicionar depoimento: {str(e)}')
        else:
            messages.error(request, 'Por favor, preencha todos os campos obrigatórios.')
    
    return render(request, 'admin_panel/testimonial_form.html')

@login_required
def testimonial_edit(request, testimonial_id):
    """Edit existing testimonial"""
    testimonial = get_object_or_404(Testimonial, id=testimonial_id)
    
    if request.method == 'POST':
        client_name = request.POST.get('client_name')
        company = request.POST.get('company')
        quote = request.POST.get('quote')
        active = bool(request.POST.get('active', False))
        
        if client_name and quote:
            try:
                testimonial.client_name = client_name
                testimonial.company = company
                testimonial.quote = quote
                testimonial.active = active
                
                if 'image' in request.FILES:
                    testimonial.image = request.FILES['image']
                    
                testimonial.save()
                messages.success(request, 'Depoimento atualizado com sucesso!')
                return redirect('testimonials_manager')
                
            except Exception as e:
                messages.error(request, f'Erro ao atualizar depoimento: {str(e)}')
        else:
            messages.error(request, 'Por favor, preencha todos os campos obrigatórios.')
    
    context = {'testimonial': testimonial}
    return render(request, 'admin_panel/testimonial_form.html', context)

@login_required
def testimonial_delete(request, testimonial_id):
    """Delete testimonial"""
    testimonial = get_object_or_404(Testimonial, id=testimonial_id)
    
    if request.method == 'POST':
        testimonial.delete()
        messages.success(request, 'Depoimento excluído com sucesso!')
        return redirect('testimonials_manager')
    
    context = {'testimonial': testimonial}
    return render(request, 'admin_panel/testimonial_delete.html', context)

@login_required
def contact_requests(request):
    """Manage contact requests"""
    # Apply filters if provided
    contact_requests_query = ContactRequest.objects.all().order_by('-created_at')
    
    # Filter by status
    status = request.GET.get('status')
    if status == 'pending':
        contact_requests_query = contact_requests_query.filter(contacted=False)
    elif status == 'contacted':
        contact_requests_query = contact_requests_query.filter(contacted=True)
    
    # Filter by service type
    service_type_id = request.GET.get('service_type')
    if service_type_id:
        try:
            contact_requests_query = contact_requests_query.filter(service_type_id=int(service_type_id))
        except (ValueError, TypeError):
            pass
    
    # Filter by has script
    has_script = request.GET.get('has_script')
    if has_script == 'yes':
        contact_requests_query = contact_requests_query.filter(script_file__isnull=False).exclude(script_file='')
    elif has_script == 'no':
        contact_requests_query = contact_requests_query.filter(Q(script_file__isnull=True) | Q(script_file=''))
    
    # Get counts after filtering
    total_requests_count = contact_requests_query.count()
    pending_requests_count = contact_requests_query.filter(contacted=False).count()

    # Pagination
    from django.core.paginator import Paginator
    paginator = Paginator(contact_requests_query, 10)  # Show 10 requests per page
    page = request.GET.get('page', 1)
    try:
        contact_requests_page = paginator.page(page)
    except:
        contact_requests_page = paginator.page(1)
    
    context = {
        'contact_requests': contact_requests_page,
        'categories': VoiceCategory.objects.all(),
        'total_requests_count': total_requests_count,
        'pending_requests_count': pending_requests_count,
    }
    return render(request, 'admin_panel/contact_requests.html', context)

@login_required
def contact_request_detail(request, request_id):
    """View contact request details"""
    contact_request = get_object_or_404(ContactRequest, id=request_id)
    context = {'contact_request': contact_request}
    return render(request, 'admin_panel/contact_request_detail.html', context)

@login_required
def mark_contacted(request, request_id):
    """Mark a contact request as contacted"""
    contact_request = get_object_or_404(ContactRequest, id=request_id)
    contact_request.contacted = not contact_request.contacted
    contact_request.save()
    return redirect('contact_request_detail', request_id=request_id)

@login_required
def category_manager(request):
    """Manage voice categories"""
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'create':
            name = request.POST.get('name')
            description = request.POST.get('description')
            
            if name:
                VoiceCategory.objects.create(
                    name=name,
                    description=description
                )
                messages.success(request, 'Categoria criada com sucesso!')
            else:
                messages.error(request, 'Nome da categoria é obrigatório.')
        
        elif action == 'update':
            category_id = request.POST.get('category_id')
            name = request.POST.get('name')
            description = request.POST.get('description')
            
            if category_id and name:
                category = get_object_or_404(VoiceCategory, id=category_id)
                category.name = name
                category.description = description
                category.save()
                messages.success(request, 'Categoria atualizada com sucesso!')
            else:
                messages.error(request, 'Informações incompletas para atualização.')
        
        elif action == 'delete':
            category_id = request.POST.get('category_id')
            
            if category_id:
                try:
                    category = get_object_or_404(VoiceCategory, id=category_id)
                    if category.audio_samples.exists():
                        messages.error(request, f'Não é possível excluir: existem {category.audio_samples.count()} áudios associados a esta categoria.')
                    else:
                        category.delete()
                        messages.success(request, 'Categoria excluída com sucesso!')
                except Exception as e:
                    messages.error(request, f'Erro ao excluir categoria: {str(e)}')
            else:
                messages.error(request, 'ID da categoria não fornecido.')
        
        return redirect('category_manager')
    
    categories = VoiceCategory.objects.annotate(samples_count=Count('audio_samples')).order_by('name')
    return render(request, 'admin_panel/category_manager.html', {'categories': categories})

@login_required
def voice_type_manager(request):
    """Manage voice types"""
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'create':
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            is_ai = bool(request.POST.get('is_ai', False))
            
            if name and gender:
                VoiceType.objects.create(
                    name=name,
                    gender=gender,
                    is_ai=is_ai
                )
                messages.success(request, 'Tipo de voz criado com sucesso!')
            else:
                messages.error(request, 'Nome e gênero são obrigatórios.')
        
        elif action == 'update':
            voice_type_id = request.POST.get('voice_type_id')
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            is_ai = bool(request.POST.get('is_ai', False))
            
            if voice_type_id and name and gender:
                voice_type = get_object_or_404(VoiceType, id=voice_type_id)
                voice_type.name = name
                voice_type.gender = gender
                voice_type.is_ai = is_ai
                voice_type.save()
                messages.success(request, 'Tipo de voz atualizado com sucesso!')
            else:
                messages.error(request, 'Informações incompletas para atualização.')
        
        elif action == 'delete':
            voice_type_id = request.POST.get('voice_type_id')
            
            if voice_type_id:
                try:
                    voice_type = get_object_or_404(VoiceType, id=voice_type_id)
                    if voice_type.audio_samples.exists():
                        messages.error(request, f'Não é possível excluir: existem {voice_type.audio_samples.count()} áudios associados a este tipo de voz.')
                    else:
                        voice_type.delete()
                        messages.success(request, 'Tipo de voz excluído com sucesso!')
                except Exception as e:
                    messages.error(request, f'Erro ao excluir tipo de voz: {str(e)}')
            else:
                messages.error(request, 'ID do tipo de voz não fornecido.')
        
        return redirect('voice_type_manager')
    
    voice_types = VoiceType.objects.annotate(samples_count=Count('audio_samples')).order_by('name')
    return render(request, 'admin_panel/voice_type_manager.html', {'voice_types': voice_types})
