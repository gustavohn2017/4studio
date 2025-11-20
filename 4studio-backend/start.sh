#!/bin/bash

# Exit on error
set -e

echo "Starting Django application..."

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

# Start gunicorn
echo "Starting Gunicorn..."
exec gunicorn 4studio.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 4 --timeout 120
