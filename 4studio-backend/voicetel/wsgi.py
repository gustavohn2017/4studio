"""
WSGI config for voicetel project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
from pathlib import Path

from django.core.wsgi import get_wsgi_application

# Use production settings if PRODUCTION environment variable is set
if os.environ.get('PRODUCTION', False):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'voicetel.settings_prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'voicetel.settings')

# Load environment variables from .env file if present
env_path = Path(__file__).resolve().parent.parent / '.env'
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

application = get_wsgi_application()
