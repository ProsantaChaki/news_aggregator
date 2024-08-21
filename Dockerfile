# Step 1: Build the React app with Vite
# Use an official Node.js image as the base image for building
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application using Vite
RUN npm run build

# Step 2: Serve the built app using a lightweight web server
# Use an official Nginx image as the base image for serving
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
