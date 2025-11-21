#!/bin/bash

# Script to create database and enable PostGIS
# Run this after PostgreSQL is started

echo "Creating database 'marketplace'..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS marketplace;"
sudo -u postgres psql -c "CREATE DATABASE marketplace;"

echo "Enabling PostGIS extension..."
sudo -u postgres psql -d marketplace -c "CREATE EXTENSION IF NOT EXISTS postgis;"
sudo -u postgres psql -d marketplace -c "CREATE EXTENSION IF NOT EXISTS postgis_topology;"

echo "✅ Database created and PostGIS enabled!"
echo "Now run: npm run db:push"
