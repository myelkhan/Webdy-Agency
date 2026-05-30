#!/bin/bash

# Webdy Agency Automated Deployment Script

echo "🚀 Starting Webdy Full-Stack Deployment Process..."

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ Error: Docker is not installed on this system." >&2
  echo "💡 Please install Docker and Docker Compose before running this script."
  exit 1
fi

# Check if Docker Compose is installed
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "❌ Error: Docker Compose is not installed on this system." >&2
  echo "💡 Please install Docker Compose or make sure 'docker compose' command works."
  exit 1
fi

echo "📦 Re-building frontend assets and compiling images..."
docker-compose build --no-cache

echo "🚢 Starting containers in detached mode..."
docker-compose up -d

echo "🟢 All services are starting up!"
echo "--------------------------------------------------------"
echo "🌐 Frontend URL: http://localhost:80"
echo "🛡️  Backend API:  http://localhost:5000"
echo "🔑 Default Admin: admin@webdy.com / AdminWebdy2026!"
echo "--------------------------------------------------------"
echo "📝 To check logs, run: docker-compose logs -f"
