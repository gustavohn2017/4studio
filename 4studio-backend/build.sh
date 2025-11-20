#!/usr/bin/env bash
# Build script for Railway deployment
# This script runs during the build phase

set -o errexit  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting 4Studio Backend Build Process..."

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install --no-cache-dir -r requirements.txt

# Collect static files
echo "� Collecting static files..."
python manage.py collectstatic --noinput --clear

# Run database migrations
echo "�️ Running database migrations..."
python manage.py migrate --noinput

# Optional: Create superuser if it doesn't exist
# Uncomment the lines below if you want to auto-create a superuser
# echo "👤 Creating superuser (if not exists)..."
# python manage.py shell << END
# from django.contrib.auth import get_user_model
# User = get_user_model()
# if not User.objects.filter(username='admin').exists():
#     User.objects.create_superuser('admin', 'admin@4studio.com.br', 'change-this-password')
#     print('✅ Superuser created successfully')
# else:
#     print('ℹ️  Superuser already exists')
# END

echo "✅ Build completed successfully!"
