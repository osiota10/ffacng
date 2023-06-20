# Stage 1: Build React app
FROM node:14 as build-stage
WORKDIR /app

# Pass environment variables as build arguments
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Set the Railway environment variables
ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Stage 2: Build Django backend
FROM python:3.10 as backend-stage
WORKDIR /app

# Install GCC compiler
RUN apt-get update && apt-get install -y gcc

# Copy the Django backend files
COPY requirements.txt ./
COPY manage.py ./

# Create and activate a virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
SHELL ["/bin/bash", "-c", "source /opt/venv/bin/activate"]

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .
COPY --from=build-stage /app/build ./frontend/build

# # Stage 3: Combine React and Django
# FROM python:3.10
# WORKDIR /app

# # Copy Django backend from the previous stage
# COPY --from=backend-stage /opt/venv /opt/venv
# COPY --from=backend-stage /app .

# # Copy built React app from the previous stage
# COPY --from=build-stage /app/build ./frontend/build

# Set the working directory to the Django project root
# WORKDIR /app

# Expose necessary ports (e.g., Django runs on 8000 by default)
EXPOSE 8000

# Set environment variables if needed

# Run collectstatic to gather static files
RUN /opt/venv/bin/python manage.py collectstatic --no-input --clear --link

# Start Gunicorn server for Django
CMD ["/opt/venv/bin/gunicorn", "backend.wsgi", "--bind", "0.0.0.0:8000", "--log-file", "-"]
