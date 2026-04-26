FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port for Hugging Face Spaces
EXPOSE 7860

# Run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]