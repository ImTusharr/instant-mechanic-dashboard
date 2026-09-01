# Use an official lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Prevent Python from writing .pyc files and enable unbuffered logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

# Copy dependencies list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn

# Copy backend application code
COPY . .

# Seed database on build if needed (optional)
RUN python seed.py

# Expose API port
EXPOSE 5000

# Run production server using Gunicorn
CMD ["gunicorn", "--workers=2", "--threads=4", "--bind", "0.0.0.0:5000", "app:app"]