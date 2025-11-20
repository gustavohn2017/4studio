"""
Production WSGI configuration for Railway deployment.
"""

import os
from django.core.wsgi import get_wsgi_application

# Use production settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '4studio.settings_prod')

application = get_wsgi_application()
