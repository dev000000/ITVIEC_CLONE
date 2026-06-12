# Drop database and recreate: schema -> data -> logos
# Usage: .\reset-db.ps1
# Requires MySQL container running (cd deploy && docker-compose up -d)

$ErrorActionPreference = "Stop"

$Container = "mysql-itviec"
$Db        = "itviec_db"
$Pw        = "root"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "=== Reset database: $Db ===" -ForegroundColor Cyan

if (-not (docker ps --filter "name=$Container" --filter "status=running" -q)) {
  Write-Host "Container '$Container' is not running. Run: cd deploy && docker-compose up -d" -ForegroundColor Red
  exit 1
}

Write-Host "[1/4] Drop database..." -ForegroundColor Yellow
docker exec $Container mysql -uroot -p"$Pw" -e "DROP DATABASE IF EXISTS ``$Db``;"

# Dùng cmd /c với file redirect để giữ UTF-8, tránh PowerShell làm hỏng encoding
Write-Host "[2/4] schema.sql..." -ForegroundColor Yellow
cmd /c "docker exec -i $Container mysql -uroot -p$Pw --default-character-set=utf8mb4 < `"$ScriptDir\schema.sql`""

Write-Host "[3/4] data.sql..." -ForegroundColor Yellow
cmd /c "docker exec -i $Container mysql -uroot -p$Pw --default-character-set=utf8mb4 $Db < `"$ScriptDir\data.sql`""

Write-Host "[4/4] seed-logos.sh..." -ForegroundColor Yellow
# Copy script + ảnh vào container rồi chạy (không cần mount)
docker cp "$ScriptDir\seed-logos.sh" "${Container}:/tmp/seed-logos.sh"
docker cp "$ScriptDir\logos"          "${Container}:/tmp/logos"
docker exec -e MYSQL_ROOT_PASSWORD=$Pw -e MYSQL_DATABASE=$Db -e DB_SEED_DIR=/tmp $Container bash /tmp/seed-logos.sh

Write-Host "`nDone." -ForegroundColor Green
