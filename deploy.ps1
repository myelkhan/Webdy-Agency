# Webdy Agency Automated Deployment Script for Windows PowerShell

Write-Host "🚀 Starting Webdy Full-Stack Deployment Process on Windows..." -ForegroundColor Cyan

# Check if Docker is running
try {
    & docker ps > $null
} catch {
    Write-Host "❌ Error: Docker is not installed or not running." -ForegroundColor Red
    Write-Host "💡 Please start Docker Desktop before running this script." -ForegroundColor Yellow
    Exit
}

Write-Host "📦 Re-building frontend assets and compiling images..." -ForegroundColor Cyan
& docker-compose build --no-cache

Write-Host "🚢 Starting containers in detached mode..." -ForegroundColor Cyan
& docker-compose up -d

Write-Host "🟢 All services are starting up!" -ForegroundColor Green
Write-Host "--------------------------------------------------------" -ForegroundColor White
Write-Host "🌐 Frontend URL: http://localhost:80" -ForegroundColor White
Write-Host "🛡️  Backend API:  http://localhost:5000" -ForegroundColor White
Write-Host "🔑 Default Admin: admin@webdy.com / AdminWebdy2026!" -ForegroundColor White
Write-Host "--------------------------------------------------------" -ForegroundColor White
Write-Host "📝 To check logs, run: docker-compose logs -f" -ForegroundColor Yellow
