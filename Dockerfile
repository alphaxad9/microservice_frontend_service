# =========================
# Stage 1 — Build React App
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

# Prevent npm from being noisy / slow
ENV npm_config_loglevel=warn
ENV CI=true

# Copy only dependency files first (cache optimization)
COPY package.json package-lock.json ./

# Install dependencies (deterministic + faster)
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build args
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_ROOM_SERVICE_URL
ARG REACT_APP_BOOKING_SERVICE_URL
ARG REACT_APP_POSTS_SERVICE_URL

# Inject build env
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_ROOM_SERVICE_URL=$REACT_APP_ROOM_SERVICE_URL
ENV REACT_APP_BOOKING_SERVICE_URL=$REACT_APP_BOOKING_SERVICE_URL
ENV REACT_APP_POSTS_SERVICE_URL=$REACT_APP_POSTS_SERVICE_URL

# Build production bundle
RUN npm run build


# =========================
# Stage 2 — Ultra Lightweight Runtime
# =========================
FROM nginx:1.27-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
