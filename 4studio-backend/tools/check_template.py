import os
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '4studio.settings')

try:
    import django
    django.setup()
    from django.template import loader
    print('Attempting to load template: admin_panel/login.html')
    loader.get_template('admin_panel/login.html')
    print('TEMPLATE OK')
except Exception as e:
    import traceback
    traceback.print_exc()
    sys.exit(1)
