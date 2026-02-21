# Use official Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (required for some Python packages)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port (Hugging Face Spaces uses 7860 by default)
EXPOSE 7860

# Run the FastAPI application using uvicorn
# Note: Hugging Face expects the app on port 7860
CMD ["uvicorn", "app.new_main:app", "--host", "0.0.0.0", "--port", "7860"]
