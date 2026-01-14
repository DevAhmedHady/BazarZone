#!/bin/bash
set -e

echo "--> Starting Database Migration..."
cd /app/migrator
dotnet BazarZone.DbMigrator.dll
echo "--> Database Migration Completed."

# Fix: Restart gateway and initialize SSL
echo "--> Restarting Gateway container..."
docker restart bazarzone-gateway || echo "Warning: Failed to restart gateway container. Ensure docker socket is mounted."
echo "--> Running SSL initialization script..."
chmod +x /app/bazarzone/init-letsencrypt.sh || true
/app/bazarzone/init-letsencrypt.sh || echo "Warning: Failed to run init-letsencrypt.sh. Ensure path is correct and mounted."

echo "--> Starting Backend API..."
cd /app
dotnet BazarZone.HttpApi.Host.dll
