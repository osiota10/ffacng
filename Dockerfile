ARG EnvironmentVariable

FROM node

ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

# Copy the package.json and package-lock.json files to the working directory
COPY frontend/package.json frontend/package-lock.json ./

# Install project dependencies using npm
RUN npm install

# Copy the rest of the frontend code to the working directory
COPY frontend/ .

# Build the frontend
RUN npm run build