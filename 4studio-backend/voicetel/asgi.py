"""
Este arquivo é redundante com 4studio/asgi.py e existe para compatibilidade.
Utilize 4studio/asgi.py para novas funcionalidades e atualizações.

ASGI config for 4Studio project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# Configuração para usar as definições do 4Studio
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '4studio.settings')

application = get_asgi_application()
