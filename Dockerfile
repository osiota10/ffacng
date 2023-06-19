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
COPY . .

# Create and activate a virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Start Gunicorn server for Django
CMD ["gunicorn", "backend.wsgi", "--log-file", "-"]
