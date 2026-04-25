# AMK AI Backend Dockerfile
# HuggingFace Space Deployment

FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY backend/ .

# Expose port for HuggingFace Spaces
EXPOSE 7860

# Environment variables
ENV PORT=7860
ENV HOST=0.0.0.0

# Run the application
CMD ["python", "main.py"]