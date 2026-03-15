# Stage 1: Build frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy all source code
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Serve frontend with Nginx
FROM nginx:alpine AS runner

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (make sure it listens on port 3005)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3005

CMD ["nginx", "-g", "daemon off;"]