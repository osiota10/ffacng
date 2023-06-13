# Frontend build stage
FROM node AS frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY frontend/ .

# Build the frontend
RUN npm run build

# Backend stage
FROM railwayapp/python:3.9 AS backend
WORKDIR /app

# Copy backend code
COPY . .

# Install additional dependencies, if needed
RUN apt-get update && apt-get install -y <package-name>

# Set environment variables, if needed
ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the necessary ports, if required
# EXPOSE <port>

# Start the application
CMD ["python", "manage.py", "runserver"]
