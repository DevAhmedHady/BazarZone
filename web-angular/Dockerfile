# Stage 1: Build the Angular application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (using clean install for consistency)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application for production
# Verify the output path in angular.json or defaults
RUN npm run build -- --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built artifacts from the build stage
# Note: The output path depends on the builder. 
# For @angular/build:application, it is typically dist/project-name/browser
COPY --from=build /app/dist/web-angular/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
