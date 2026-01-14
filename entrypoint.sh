#!/bin/bash
set -e

echo "--> Starting Database Migration..."
cd /app/migrator
dotnet BazarZone.DbMigrator.dll
echo "--> Database Migration Completed."

echo "--> Starting Backend API..."
cd /app
dotnet BazarZone.HttpApi.Host.dll
