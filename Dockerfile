# Use nginx:alpine for a small, secure, and fast image
FROM nginx:alpine

# Copy the static files to the nginx default public directory
# In our project, everything is in the root directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
