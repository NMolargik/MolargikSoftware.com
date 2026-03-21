#!/usr/bin/env bash
# optimize-images.sh
# Resizes oversized screenshots then runs pngquant lossy compression on all PNGs.
# Safe to re-run — skips files that are already small enough.

set -euo pipefail

ASSETS="$(cd "$(dirname "$0")/.." && pwd)/src/assets"
MAX_HEIGHT=1200   # px — 2× retina for h-96 (384px) carousel display
QUALITY="65-85"   # pngquant quality range (good visual quality, big savings)

command -v ffmpeg   >/dev/null 2>&1 || { echo "❌  ffmpeg not found"; exit 1; }
command -v pngquant >/dev/null 2>&1 || { echo "❌  pngquant not found — run: brew install pngquant"; exit 1; }

total_before=0
total_after=0
resized=0
compressed=0

echo "📁  Assets dir: $ASSETS"
echo "🔧  Max height: ${MAX_HEIGHT}px  |  pngquant quality: ${QUALITY}"
echo ""

while IFS= read -r -d '' file; do
  before=$(stat -f%z "$file")
  total_before=$((total_before + before))

  # --- Step 1: resize if taller than MAX_HEIGHT ---
  height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$file" 2>/dev/null || echo 0)
  if [ "${height:-0}" -gt "$MAX_HEIGHT" ]; then
    tmp="${file}.tmp_resize.png"
    ffmpeg -y -i "$file" -vf "scale=-2:${MAX_HEIGHT}" -compression_level 6 "$tmp" -loglevel error
    mv "$tmp" "$file"
    resized=$((resized + 1))
  fi

  # --- Step 2: pngquant lossy compression ---
  tmp_q="${file%.png}-opt.png"
  if pngquant --quality="$QUALITY" --speed 1 --strip --force --output "$tmp_q" "$file" 2>/dev/null; then
    after=$(stat -f%z "$tmp_q")
    if [ "$after" -lt "$before" ]; then
      mv "$tmp_q" "$file"
      compressed=$((compressed + 1))
    else
      rm -f "$tmp_q"
      after=$before
    fi
  else
    rm -f "$tmp_q"
    after=$(stat -f%z "$file")
  fi

  total_after=$((total_after + after))

  saved=$((before - after))
  if [ "$saved" -gt 0 ]; then
    pct=$(( saved * 100 / before ))
    printf "  ✅  %-60s  %4d KB → %4d KB  (-%d%%)\n" \
      "$(basename "$(dirname "$file")")/$(basename "$file")" \
      $((before / 1024)) $((after / 1024)) "$pct"
  fi

done < <(find "$ASSETS" -type f -iname "*.png" -print0)

# --- JPEGs via ffmpeg ---
while IFS= read -r -d '' file; do
  before=$(stat -f%z "$file")
  total_before=$((total_before + before))

  tmp="${file}.tmp_jpg"
  ffmpeg -y -i "$file" -q:v 4 "$tmp" -loglevel error 2>/dev/null
  after=$(stat -f%z "$tmp")
  if [ "$after" -lt "$before" ]; then
    mv "$tmp" "$file"
    compressed=$((compressed + 1))
    saved=$((before - after))
    pct=$(( saved * 100 / before ))
    printf "  ✅  %-60s  %4d KB → %4d KB  (-%d%%)\n" \
      "$(basename "$(dirname "$file")")/$(basename "$file")" \
      $((before / 1024)) $((after / 1024)) "$pct"
  else
    rm -f "$tmp"
    after=$before
  fi
  total_after=$((total_after + after))

done < <(find "$ASSETS" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

echo ""
echo "──────────────────────────────────────────────"
saved_total=$((total_before - total_after))
pct_total=$(( saved_total * 100 / total_before ))
echo "  Resized:    $resized files"
echo "  Compressed: $compressed files"
printf "  Before:     %d MB\n" $((total_before / 1024 / 1024))
printf "  After:      %d MB\n" $((total_after / 1024 / 1024))
printf "  Saved:      %d MB  (-%d%%)\n" $((saved_total / 1024 / 1024)) "$pct_total"
echo "──────────────────────────────────────────────"
