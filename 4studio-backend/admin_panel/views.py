from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.http import JsonResponse, HttpResponseForbidden
from api.models import VoiceCategory, VoiceType, AudioSample, Testimonial, ContactRequest
from django.db.models import Count, Q
from .forms import AudioSampleForm, TestimonialForm, VoiceCategoryForm, VoiceTypeForm
from django.contrib.auth.views import LoginView
from django.core.cache import cache
from django.utils.translation import gettext as _
from django.http import HttpResponse

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
    # O authentication_form padrão já é o AuthenticationForm, não precisa ser explícito

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        form.fields['username'].widget.attrs.update({
            'class': 'w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 transition-all duration-200 focus:bg-slate-800/80 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none hover:border-gray-600/50',
            'placeholder': 'Digite seu usuário ou e-mail',
            'aria-label': 'Usuário ou e-mail',
            'autofocus': 'autofocus'
        })
        form.fields['password'].widget.attrs.update({
            'class': 'w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 transition-all duration-200 focus:bg-slate-800/80 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none hover:border-gray-600/50',
            'placeholder': '••••••••',
            'aria-label': 'Senha'
        })
        return form
    
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
        
        # Log de debug para tentativa de login falha
        import logging
        logger = logging.getLogger(__name__)
        logger.debug(f"Tentativa de login falha para usuário: {username}")
        logger.debug(f"Erros no formulário: {form.errors}")
        
        messages.error(self.request, _('Nome de usuário ou senha incorretos. Por favor, verifique suas credenciais.'))
        return super().form_invalid(form)

    def form_valid(self, form):
        # Limpa o contador de tentativas quando o login for bem-sucedido
        username = form.cleaned_data.get('username')
        cache.delete(f"login_attempts_{username}")
        
        # Log de debug para login bem-sucedido
        import logging
        logger = logging.getLogger(__name__)
        logger.debug(f"Login bem-sucedido para usuário: {username}")
        
        return super().form_valid(form)

@login_required
def admin_dashboard(request):
    """Admin dashboard with overview statistics"""
    context = {
        'total_audio_samples': AudioSample.objects.count(),
        'total_categories': VoiceCategory.objects.count(),
        'total_voice_types': VoiceType.objects.count(),
        'total_testimonials': Testimonial.objects.count(),
        'category_counts': VoiceCategory.objects.annotate(sample_count=Count('audio_samples')),
        'recent_contacts': ContactRequest.objects.order_by('-created_at')[:5],
        'recent_uploads': AudioSample.objects.order_by('-created_at')[:5],
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
        form = AudioSampleForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Áudio adicionado com sucesso!')
            return redirect('admin_panel:audio_manager')
        else:
            messages.error(request, 'Por favor, corrija os erros abaixo.')
    else:
        form = AudioSampleForm()
    return render(request, 'admin_panel/audio_form.html', {'form': form})

@login_required
def audio_edit(request, audio_id):
    """Edit existing audio sample"""
    audio = get_object_or_404(AudioSample, id=audio_id)
    if request.method == 'POST':
        form = AudioSampleForm(request.POST, request.FILES, instance=audio)
        if form.is_valid():
            form.save()
            messages.success(request, 'Áudio atualizado com sucesso!')
            return redirect('admin_panel:audio_manager')
        else:
            messages.error(request, 'Por favor, corrija os erros abaixo.')
    else:
        form = AudioSampleForm(instance=audio)
    return render(request, 'admin_panel/audio_form.html', {'form': form, 'audio': audio})

@login_required
def audio_delete(request, audio_id):
    """Delete audio sample"""
    audio = get_object_or_404(AudioSample, id=audio_id)
    if request.method == 'POST':
        audio.delete()
        messages.success(request, 'Áudio excluído com sucesso!')
        return redirect('admin_panel:audio_manager')
    context = {'audio': audio}
    return render(request, 'admin_panel/audio_delete_confirm.html', context)

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
        form = TestimonialForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Depoimento adicionado com sucesso!')
            return redirect('admin_panel:testimonials_manager')
        else:
            messages.error(request, 'Por favor, corrija os erros abaixo.')
    else:
        form = TestimonialForm()
    return render(request, 'admin_panel/testimonial_form.html', {'form': form})

@login_required
def testimonial_edit(request, testimonial_id):
    """Edit existing testimonial"""
    testimonial = get_object_or_404(Testimonial, id=testimonial_id)
    if request.method == 'POST':
        form = TestimonialForm(request.POST, request.FILES, instance=testimonial)
        if form.is_valid():
            form.save()
            messages.success(request, 'Depoimento atualizado com sucesso!')
            return redirect('admin_panel:testimonials_manager')
        else:
            messages.error(request, 'Por favor, corrija os erros abaixo.')
    else:
        form = TestimonialForm(instance=testimonial)
    return render(request, 'admin_panel/testimonial_form.html', {'form': form, 'testimonial': testimonial})

@login_required
def testimonial_delete(request, testimonial_id):
    """Delete testimonial"""
    testimonial = get_object_or_404(Testimonial, id=testimonial_id)
    if request.method == 'POST':
        testimonial.delete()
        messages.success(request, 'Depoimento excluído com sucesso!')
        return redirect('admin_panel:testimonials_manager')
    context = {'testimonial': testimonial}
    return render(request, 'admin_panel/testimonial_delete_confirm.html', context)

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
    return redirect('admin_panel:contact_request_detail', request_id=request_id)

@login_required
def category_manager(request):
    """Manage voice categories"""
    categories = VoiceCategory.objects.annotate(samples_count=Count('audio_samples')).order_by('name')
    return render(request, 'admin_panel/category_manager.html', {'categories': categories})

@login_required
def category_add(request):
    if request.method == 'POST':
        form = VoiceCategoryForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Categoria criada com sucesso!')
            return redirect('admin_panel:category_manager')
    else:
        form = VoiceCategoryForm()
    return render(request, 'admin_panel/category_form.html', {'form': form})

@login_required
def category_edit(request, category_id):
    category = get_object_or_404(VoiceCategory, id=category_id)
    if request.method == 'POST':
        form = VoiceCategoryForm(request.POST, instance=category)
        if form.is_valid():
            form.save()
            messages.success(request, 'Categoria atualizada com sucesso!')
            return redirect('admin_panel:category_manager')
    else:
        form = VoiceCategoryForm(instance=category)
    return render(request, 'admin_panel/category_form.html', {'form': form, 'category': category})

@login_required
def category_delete(request, category_id):
    category = get_object_or_404(VoiceCategory, id=category_id)
    if category.audio_samples.exists():
        messages.error(request, f'Não é possível excluir: existem {category.audio_samples.count()} áudios associados a esta categoria.')
        return redirect('admin_panel:category_manager')
    
    if request.method == 'POST':
        category.delete()
        messages.success(request, 'Categoria excluída com sucesso!')
        return redirect('admin_panel:category_manager')
        
    return render(request, 'admin_panel/category_delete_confirm.html', {'category': category})

@login_required
def voice_type_manager(request):
    """Manage voice types"""
    voice_types = VoiceType.objects.annotate(samples_count=Count('audio_samples')).order_by('name')
    return render(request, 'admin_panel/voice_type_manager.html', {'voice_types': voice_types})

@login_required
def voice_type_add(request):
    if request.method == 'POST':
        form = VoiceTypeForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Tipo de voz criado com sucesso!')
            return redirect('admin_panel:voice_type_manager')
    else:
        form = VoiceTypeForm()
    return render(request, 'admin_panel/voice_type_form.html', {'form': form})

@login_required
def voice_type_edit(request, voice_type_id):
    voice_type = get_object_or_404(VoiceType, id=voice_type_id)
    if request.method == 'POST':
        form = VoiceTypeForm(request.POST, instance=voice_type)
        if form.is_valid():
            form.save()
            messages.success(request, 'Tipo de voz atualizado com sucesso!')
            return redirect('admin_panel:voice_type_manager')
    else:
        form = VoiceTypeForm(instance=voice_type)
    return render(request, 'admin_panel/voice_type_form.html', {'form': form, 'voice_type': voice_type})

@login_required
def voice_type_delete(request, voice_type_id):
    voice_type = get_object_or_404(VoiceType, id=voice_type_id)
    if voice_type.audio_samples.exists():
        messages.error(request, f'Não é possível excluir: existem {voice_type.audio_samples.count()} áudios associados a este tipo de voz.')
        return redirect('admin_panel:voice_type_manager')

    if request.method == 'POST':
        voice_type.delete()
        messages.success(request, 'Tipo de voz excluído com sucesso!')
        return redirect('admin_panel:voice_type_manager')

    return render(request, 'admin_panel/voice_type_delete_confirm.html', {'voice_type': voice_type})
