from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_contact_email(contact_request):
    """
    Enviar notificação por email sobre nova solicitação de contato
    para o administrador e email de confirmação para o cliente
    """
    try:
        # Email to admin
        subject = f'Nova Solicitação de Contato - {contact_request.name}'
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = settings.ADMIN_EMAIL  # Should be defined in settings
        
        # Context data for email template
        context = {
            'name': contact_request.name,
            'email': contact_request.email,
            'phone': contact_request.phone,
            'company': contact_request.company,
            'message': contact_request.message,
            'service_type': contact_request.service_type.name if contact_request.service_type else 'Não especificado',
            'created_at': contact_request.created_at.strftime('%d/%m/%Y %H:%M'),
            'has_attachment': bool(contact_request.script_file)
        }
        
        # Render HTML content
        html_content = render_to_string('email/contact_notification.html', context)
        text_content = strip_tags(html_content)
        
        # Create email message
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=[to_email],
            reply_to=[contact_request.email]
        )
        
        # Attach HTML content
        email.attach_alternative(html_content, "text/html")
        
        # Attach script file if uploaded
        if contact_request.script_file:
            file_path = contact_request.script_file.path
            file_name = contact_request.script_file.name.split('/')[-1]
            with open(file_path, 'rb') as f:
                file_content = f.read()
                email.attach(file_name, file_content)
        
        # Send admin notification
        email.send()
        logger.info(f"Admin contact notification email sent for {contact_request.email}")
        
        # Send confirmation email to customer
        customer_subject = 'Recebemos sua mensagem - VoiceTel'
        customer_context = {
            'name': contact_request.name,
            'has_attachment': bool(contact_request.script_file)
        }
        
        customer_html_content = render_to_string('email/contact_confirmation.html', customer_context)
        customer_text_content = strip_tags(customer_html_content)
        
        customer_email = EmailMultiAlternatives(
            subject=customer_subject,
            body=customer_text_content,
            from_email=from_email,
            to=[contact_request.email]
        )
        
        customer_email.attach_alternative(customer_html_content, "text/html")
        customer_email.send()
        logger.info(f"Customer confirmation email sent to {contact_request.email}")
        
        return True
    
    except Exception as e:
        logger.error(f"Error sending contact email: {e}")
        return False
