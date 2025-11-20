#!/usr/bin/env python
import os
import sys
import subprocess

print("=" * 50)
print("Starting Django application...")
print("=" * 50)
print(f"PORT: {os.getenv('PORT', '8000')}")
print(f"DATABASE_URL: {os.getenv('DATABASE_URL', 'NOT SET')[:30]}...")
print(f"DJANGO_SETTINGS_MODULE: {os.getenv('DJANGO_SETTINGS_MODULE', 'NOT SET')}")
print(f"DEBUG: {os.getenv('DEBUG', 'NOT SET')}")
print(f"ALLOWED_HOSTS: {os.getenv('ALLOWED_HOSTS', 'NOT SET')}")
print("=" * 50)

# Test Django settings
print("\nTesting Django configuration...")
try:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', '4studio.settings_prod')
    import django
    django.setup()
    from django.conf import settings
    print(f"✓ ROOT_URLCONF: {settings.ROOT_URLCONF}")
    print(f"✓ WSGI_APPLICATION: {settings.WSGI_APPLICATION}")
    print(f"✓ Database: {settings.DATABASES['default']['ENGINE']}")
    print(f"✓ Installed apps: {len(settings.INSTALLED_APPS)} apps")
except Exception as e:
    print(f"✗ Django configuration error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

def run_command(cmd, description):
    """Run a command and handle errors"""
    print(f"\n{description}...")
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        print(result.stdout)
        print(f"✓ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ ERROR in {description}:")
        print(e.stdout)
        sys.exit(1)

# Run migrations
run_command("python manage.py migrate --noinput", "Running database migrations")

# Collect static files
run_command("python manage.py collectstatic --noinput --clear", "Collecting static files")

# Start Gunicorn
print("\n" + "=" * 50)
print("Starting Gunicorn...")
print("=" * 50)

# Railway define PORT automaticamente, geralmente 8080
port = os.getenv('PORT', '8080')
print(f"Binding to port: {port}")

cmd = [
    "gunicorn",
    "4studio.wsgi:application",
    "--bind", f"0.0.0.0:{port}",
    "--workers", "4",
    "--timeout", "120",
    "--access-logfile", "-",
    "--error-logfile", "-",
    "--log-level", "debug",
    "--capture-output",
    "--enable-stdio-inheritance"
]

print(f"Command: {' '.join(cmd)}")
sys.stdout.flush()

os.execvp("gunicorn", cmd)
