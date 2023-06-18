# Stage 1: Build React app
FROM node:14 as build-stage
WORKDIR /app

# Pass environment variables as build arguments
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Stage 2: Build Django backend
FROM python:3.10 as backend-stage
WORKDIR /app

# Copy the Django backend files
COPY requirements.txt ./
COPY manage.py ./
COPY . .

# Create and activate a virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pip install gunicorn


# Stage 3: Combine React and Django
FROM python:3.10
WORKDIR /app

# Set the Railway environment variables
ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

# Copy Django backend from the previous stage
COPY --from=backend-stage /opt/venv /opt/venv
COPY --from=backend-stage /app .

# Copy built React app from the previous stage
COPY --from=build-stage /app/build ./frontend/build

# Set the working directory to the Django project root
# WORKDIR /app/backend

# Expose necessary ports (e.g., Django runs on 8000 by default)
EXPOSE 8000

# Set environment variables if needed

# Run collectstatic to gather static files
# RUN /opt/venv/bin/python manage.py collectstatic --no-input --clear --link

# Start Gunicorn server for Django
CMD ["gunicorn", "backend.wsgi", "--bind", "0.0.0.0:8000", "--log-file", "-"]
