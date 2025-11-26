from django.urls import path, include
from django.contrib.auth import views as auth_views
from .forms import AdminPasswordResetForm, AdminSetPasswordForm
from .views import ( # type: ignore
    SecureLoginView,
    admin_dashboard,
    audio_manager,
    audio_upload,
    audio_edit,
    audio_delete,
    testimonials_manager,
    testimonial_add,
    testimonial_edit,
    testimonial_delete,
    category_manager,
    category_add,
    category_edit,
    category_delete,
    voice_type_manager,
    voice_type_add,
    voice_type_edit,
    voice_type_delete,
    contact_requests,
)

# App name para namespace
app_name = 'admin_panel'

urlpatterns = [
    # Rota principal do painel (Dashboard)
    path('', admin_dashboard, name='admin_dashboard'),
    
    # Rotas de autenticação personalizadas
    path('login/', SecureLoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/admin-panel/login/'), name='logout'),
    
    # Rotas de recuperação de senha (customizadas para o painel)
    path('password_reset/',
        auth_views.PasswordResetView.as_view(
            template_name='admin_panel/password_reset_form.html',
            email_template_name='admin_panel/password_reset_email.html',
            form_class=AdminPasswordResetForm,
            success_url='/admin-panel/password_reset/done/'
        ),
        name='password_reset'),

    path('password_reset/done/',
        auth_views.PasswordResetDoneView.as_view(
            template_name='admin_panel/password_reset_done.html'
        ),
        name='password_reset_done'),

    path('reset/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(
            template_name='admin_panel/password_reset_confirm.html',
            form_class=AdminSetPasswordForm,
            success_url='/admin-panel/reset/done/'
        ),
        name='password_reset_confirm'),

    path('reset/done/',
        auth_views.PasswordResetCompleteView.as_view(
            template_name='admin_panel/password_reset_complete.html'
        ),
        name='password_reset_complete'),

    # Password change views
    path('password_change/',
        auth_views.PasswordChangeView.as_view(
            template_name='admin_panel/password_change.html',
            success_url='/admin-panel/password_change/done/'
        ),
        name='password_change'),
    
    path('password_change/done/',
        auth_views.PasswordChangeDoneView.as_view(
            template_name='admin_panel/password_change_done.html'
        ),
        name='password_change_done'),
    
    # Rotas de gerenciamento
    path('audios/', audio_manager, name='audio_manager'),
    path('audios/upload/', audio_upload, name='audio_upload'),
    path('audios/edit/<int:audio_id>/', audio_edit, name='audio_edit'),
    path('audios/delete/<int:audio_id>/', audio_delete, name='audio_delete'),
    path('depoimentos/', testimonials_manager, name='testimonials_manager'),
    path('depoimentos/adicionar/', testimonial_add, name='testimonial_add'),
    path('depoimentos/editar/<int:testimonial_id>/', testimonial_edit, name='testimonial_edit'),
    path('depoimentos/deletar/<int:testimonial_id>/', testimonial_delete, name='testimonial_delete'),
    path('categorias/', category_manager, name='category_manager'),
    path('categorias/adicionar/', category_add, name='category_add'),
    path('categorias/editar/<int:category_id>/', category_edit, name='category_edit'),
    path('categorias/deletar/<int:category_id>/', category_delete, name='category_delete'),
    path('tipos-de-voz/', voice_type_manager, name='voice_type_manager'),
    path('tipos-de-voz/adicionar/', voice_type_add, name='voice_type_add'),
    path('tipos-de-voz/editar/<int:voice_type_id>/', voice_type_edit, name='voice_type_edit'),
    path('tipos-de-voz/deletar/<int:voice_type_id>/', voice_type_delete, name='voice_type_delete'),
    path('solicitacoes/', contact_requests, name='contact_requests'),
]