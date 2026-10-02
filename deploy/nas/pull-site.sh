#!/usr/bin/env bash
# pull-site.sh — deploy molargiksoftware.com on the NAS by pulling releases.
#
# Fetches the latest GitHub Release of the website repo and, if it is newer
# than what is on disk, downloads its `site.tar.gz` asset and rsyncs the
# contents into the nginx document root with web-readable permissions.
#
# Safe to run every few minutes from a scheduled task; it exits quietly when
# nothing changed. Run with FORCE=1 to redeploy the current release.
#
# A copy lives on the NAS at /volume1/docker/web/deploy/pull-site.sh and runs
# every 5 minutes as root from /etc/cron.d/molargiksoftware-deploy:
#
#   */5 * * * * root /volume1/docker/web/deploy/pull-site.sh >/dev/null 2>&1
#
# Keep this file in the repo as the source of truth and copy it over when it
# changes. If a UGOS update ever clears /etc/cron.d, recreate that one line.

set -euo pipefail

REPO="${REPO:-NMolargik/MolargikSoftware.com}"
ASSET="${ASSET:-site.tar.gz}"
SITE_DIR="${SITE_DIR:-/volume1/docker/web/sites/molargiksoftware}"
STATE_DIR="${STATE_DIR:-/volume1/docker/web/deploy}"
STATE_FILE="$STATE_DIR/deployed-tag"
LOG_FILE="$STATE_DIR/pull-site.log"

log() {
  printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$LOG_FILE"
}

mkdir -p "$STATE_DIR"

# The nginx container reads the site as an unprivileged user, so every file
# must be world-readable and every directory world-traversable. Enforce it on
# every run (not just deploys) so a bad copy can never take the site down for
# more than one tick.
ensure_readable() {
  [ -d "$SITE_DIR" ] || return 0
  local unreadable
  unreadable=$(find "$SITE_DIR" ! -perm -o=r -o -type d ! -perm -o=x | wc -l)
  if [ "$unreadable" -gt 0 ]; then
    chmod -R u=rwX,go=rX "$SITE_DIR"
    log "fixed permissions on $unreadable unreadable path(s) under $SITE_DIR"
  fi
}

ensure_readable

latest_json=$(curl -fsSL -H 'Accept: application/vnd.github+json' \
  "https://api.github.com/repos/$REPO/releases/latest") \
  || { log "could not query GitHub releases for $REPO"; exit 1; }

tag=$(printf '%s' "$latest_json" \
  | python3 -c 'import sys, json; print(json.load(sys.stdin).get("tag_name", ""))')
[ -n "$tag" ] || { log "no published release found for $REPO"; exit 1; }

current=$(cat "$STATE_FILE" 2>/dev/null || true)
if [ "$tag" = "$current" ] && [ "${FORCE:-0}" != "1" ]; then
  exit 0
fi

log "deploying $tag (currently: ${current:-none})"

tmp=$(mktemp -d "${TMPDIR:-/tmp}/site.XXXXXX")
trap 'rm -rf "$tmp"' EXIT

curl -fsSL -o "$tmp/$ASSET" "https://github.com/$REPO/releases/download/$tag/$ASSET" \
  || { log "release $tag has no $ASSET asset yet"; exit 1; }

mkdir -p "$tmp/site"
tar -xzf "$tmp/$ASSET" -C "$tmp/site"
[ -f "$tmp/site/index.html" ] || { log "archive has no index.html, aborting"; exit 1; }

mkdir -p "$SITE_DIR"
# --delete clears files from previous builds; --chmod keeps everything
# readable by the nginx container regardless of the caller's umask.
rsync -a --delete --chmod=D755,F644 "$tmp/site/" "$SITE_DIR/"
# Belt and braces: --chmod has been seen not to apply under cron on UGOS.
chmod -R u=rwX,go=rX "$SITE_DIR"

printf '%s\n' "$tag" > "$STATE_FILE"
log "deployed $tag to $SITE_DIR"
