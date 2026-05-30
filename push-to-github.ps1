# Webdy GitHub Push Automation Script

Write-Host "GitHub Push Automation Helper" -ForegroundColor Cyan
Write-Host "----------------------------------" -ForegroundColor Cyan

# Check if Git is installed
try {
    $gitVer = & git --version
    Write-Host "✔ Found Git: $gitVer" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Git is not installed or not in your system path." -ForegroundColor Red
    Write-Host "💡 Please download and install Git from: https://git-scm.com/downloads" -ForegroundColor Yellow
    Write-Host "💡 After installing, close and restart this terminal, then run this script again." -ForegroundColor Yellow
    Exit
}

$repoUrl = Read-Host "Enter your GitHub Repository URL (e.g., https://github.com/username/repo-name.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "❌ Error: Repository URL cannot be empty." -ForegroundColor Red
    Exit
}

Write-Host "`n⚙ Initializing Git repository..." -ForegroundColor Cyan
& git init

# Ensure a proper root .gitignore exists
if (-not (Test-Path ".gitignore")) {
    $gitignoreContent = @"
node_modules/
dist/
.env
*.log
backend/data/fallback_db.json
/tmp/
.git/
"@
    Set-Content -Path ".gitignore" -Value $gitignoreContent
    Write-Host "✔ Created .gitignore file" -ForegroundColor Green
}

Write-Host "`n📦 Staging project files..." -ForegroundColor Cyan
& git add .

Write-Host "`n💾 Creating initial commit..." -ForegroundColor Cyan
& git commit -m "Initial commit of Webdy Premium Agency website"

Write-Host "`n🔀 Configuring branch to main..." -ForegroundColor Cyan
& git branch -M main

Write-Host "`n🔗 Linking to remote repository..." -ForegroundColor Cyan
& git remote remove origin 2>$null
& git remote add origin $repoUrl

Write-Host "`n🚀 Pushing code to GitHub (this may open a browser window to log in)..." -ForegroundColor Cyan
& git push -u origin main -f

Write-Host "`n🎉 Success! The code has been pushed to GitHub." -ForegroundColor Green
