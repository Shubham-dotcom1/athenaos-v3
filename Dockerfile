# Use official Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first
COPY athenaos_backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY athenaos_backend/ .

# Expose port (HF default 7860)
EXPOSE 7860

# Run
CMD ["uvicorn", "app.new_main:app", "--host", "0.0.0.0", "--port", "7860"]
