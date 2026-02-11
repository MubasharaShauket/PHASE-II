# One-Click Railway Deploy Script for PHASE-II Backend
Write-Host "🚀 Starting Railway deployment..." -ForegroundColor Green

# Backend folder path
$backendDir = "C:\Users\User\Desktop\phase 2\backend"

# Verify backend folder exists
if (-not (Test-Path $backendDir)) {
    Write-Host "❌ Error: Backend directory does not exist at $backendDir" -ForegroundColor Red
    exit 1
}

# Navigate to backend folder
Set-Location -Path $backendDir
Write-Host "📂 Navigated to: $(Get-Location)" -ForegroundColor Yellow

# Check Railway CLI
try {
    $railwayVersion = $(railway --version 2>$null)
    if (-not $railwayVersion) {
        Write-Host "🔧 Installing Railway CLI..." -ForegroundColor Yellow
        npm install -g @railway/cli
    }
} catch {
    Write-Host "🔧 Installing Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

# Ensure logged in
try {
    $whoami = $(railway whoami 2>$null)
    if (-not $whoami) {
        Write-Host "❌ Please login first: railway login" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "✅ Logged in as $whoami" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Please login first: railway login" -ForegroundColor Red
    exit 1
}

# Link project (using your Railway project ID)
Write-Host "🔗 Linking to Railway project..." -ForegroundColor Yellow
railway link --project b44ace12-b8f4-4eb1-b971-06eed436c7c7

# Set essential environment variables
Write-Host "⚙️ Setting environment variables..." -ForegroundColor Yellow
railway vars set NODE_ENV=production
railway vars set PORT=8000

# Deploy backend
Write-Host "🚀 Deploying backend..." -ForegroundColor Yellow
railway deploy

# Wait for deployment
Start-Sleep -Seconds 15

# Get live URL
$backendUrl = $(railway domain 2>$null)
if (-not $backendUrl) {
    # fallback
    $backendUrl = $(railway status 2>&1 | Select-String -Pattern "https://.*\.up\.railway\.app")
    if ($backendUrl) { $backendUrl = $backendUrl.ToString().Trim() }
}

if ($backendUrl) {
    Write-Host "✅ Backend deployed successfully!" -ForegroundColor Green
    Write-Host "🌐 Live Backend URL: $backendUrl" -ForegroundColor Cyan
} else {
    Write-Host "❌ Could not retrieve deployment URL. Check Railway dashboard:" -ForegroundColor Red
    Write-Host "https://railway.com/project/b44ace12-b8f4-4eb1-b971-06eed436c7c7" -ForegroundColor Yellow
}

Write-Host "🎉 Deployment script finished!" -ForegroundColor Green