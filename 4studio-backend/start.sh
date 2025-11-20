#!/bin/bash

# Exit on error
set -e

echo "========================================="
echo "Starting Django application..."
echo "========================================="
echo "PORT: ${PORT}"
echo "DATABASE_URL: ${DATABASE_URL:0:20}..." 
echo "DJANGO_SETTINGS_MODULE: ${DJANGO_SETTINGS_MODULE}"
echo "========================================="

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput || {
    echo "ERROR: Migration failed!"
    exit 1
}

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear || {
    echo "ERROR: Collectstatic failed!"
    exit 1
}

# Start gunicorn
echo "Starting Gunicorn on 0.0.0.0:${PORT:-8000}..."
exec gunicorn 4studio.wsgi:application \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    --log-level info
