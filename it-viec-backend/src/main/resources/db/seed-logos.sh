#!/bin/bash
# Insert logo images from ./logos/ into company_logos and update companies.logo_url.
# Filename (without extension) must match companies.id
#
# Usage (inside MySQL container):
#   bash /tmp/seed-logos.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOGO_DIR="${DB_SEED_DIR:-$SCRIPT_DIR}/logos"
MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-root}"
MYSQL_DATABASE="${MYSQL_DATABASE:-itviec_db}"
API_BASE="${API_BASE:-http://localhost:8081}"

if [ ! -d "$LOGO_DIR" ] || [ -z "$(ls -A "$LOGO_DIR" 2>/dev/null)" ]; then
  echo "[seed-logos] No logo files in $LOGO_DIR, skipping."
  exit 0
fi

echo "[seed-logos] Seeding from $LOGO_DIR ..."

for file in "$LOGO_DIR"/*; do
  [ -f "$file" ] || continue

  filename=$(basename "$file")
  company_id="${filename%.*}"
  ext="${filename##*.}"

  case "$ext" in
    png)      content_type="image/png" ;;
    jpg|jpeg) content_type="image/jpeg" ;;
    webp)     content_type="image/webp" ;;
    svg)      content_type="image/svg+xml" ;;
    gif)      content_type="image/gif" ;;
    *)        echo "  [skip] $filename (unsupported format)"; continue ;;
  esac

  size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
  hex_data=$(od -An -v -tx1 "$file" | tr -d ' \n' | tr '[:lower:]' '[:upper:]')
  logo_id=$(cat /proc/sys/kernel/random/uuid 2>/dev/null || echo "logo-$company_id")
  logo_url="${API_BASE}/api/v1/companies/${company_id}/logo"

  mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" -e "
    INSERT INTO company_logos (id, company_id, file_name, content_type, size, logo_data)
    VALUES ('$logo_id', '$company_id', '$filename', '$content_type', $size, X'$hex_data')
    ON DUPLICATE KEY UPDATE
      file_name='$filename', content_type='$content_type',
      size=$size, logo_data=X'$hex_data', updated_at=NOW();

    UPDATE companies SET logo_url='$logo_url' WHERE id='$company_id';
  "

  echo "  [OK] $filename -> company_id=$company_id (${size} bytes)"
done

echo "[seed-logos] Done."
