# Use Python 3.12 slim image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies including PostgreSQL client
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy project files
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Run build script (collectstatic and migrations will be done on startup)
# We'll do this in the start command instead to ensure DATABASE_URL is available

# Expose port (Railway sets PORT env variable)
EXPOSE 8000

# Start command - will be overridden by Railway's start command
CMD gunicorn 4studio.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 4 --timeout 120
