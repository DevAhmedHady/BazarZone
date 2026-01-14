#!/bin/bash

# BazarZone SSL Certificate Setup Script
# Run this on your VPS after the first deployment

set -e

DOMAIN="bazar-zone.com"
EMAIL="admin@bazar-zone.com"  # <-- CHANGE THIS to your email

cd ~/bazarzone

echo "=== Step 1: Ensure gateway is running (HTTP only) ==="
docker compose -f docker-compose.prod.yml up -d gateway

echo "=== Step 2: Wait for gateway to be ready ==="
sleep 5

echo "=== Step 3: Request SSL certificates ==="
docker compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path /var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN \
    -d api.$DOMAIN

echo "=== Step 4: Switch to SSL-enabled nginx config ==="
cp ~/bazarzone/gateway/nginx-ssl.conf ~/bazarzone/gateway/nginx.conf

echo "=== Step 5: Reload gateway with SSL ==="
docker compose -f docker-compose.prod.yml exec gateway nginx -s reload || docker compose -f docker-compose.prod.yml restart gateway

echo "=== Done! SSL is now enabled ==="
echo "Frontend: https://$DOMAIN"
echo "API: https://api.$DOMAIN"
