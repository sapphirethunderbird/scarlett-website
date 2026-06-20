#!/usr/bin/env bash
#
# backup-config.sh — snapshot the scarlett-web server config into a private git repo.
#
# Backs up (relative to this repo dir):
#   - Caddyfile               (plaintext; no secrets)
#   - scarlett-web.service    (plaintext; the systemd unit)
#   - env.enc                 (the service .env, encrypted with SOPS + age)
#
# Designed to run from cron on the server. See README.md for one-time setup.

set -euo pipefail

# --- Paths (confirm against the actual server layout) -----------------------
REPO_DIR="${REPO_DIR:-/opt/scarlett-config-backup}"
CADDYFILE="${CADDYFILE:-/etc/caddy/Caddyfile}"
UNIT="${UNIT:-/etc/systemd/system/scarlett-web.service}"

# Derive the env file from the unit's EnvironmentFile= so it can't drift.
# Falls back to a sensible default if the unit doesn't declare one.
ENV_FILE="${ENV_FILE:-}"
if [[ -z "$ENV_FILE" && -f "$UNIT" ]]; then
  ENV_FILE="$(grep -E '^\s*EnvironmentFile=' "$UNIT" | tail -n1 | cut -d= -f2- | tr -d ' ' || true)"
fi
ENV_FILE="${ENV_FILE:-/opt/scarlett-web/.env}"

# age key location for SOPS (private key lives ONLY on the server + an off-server copy).
export SOPS_AGE_KEY_FILE="${SOPS_AGE_KEY_FILE:-$HOME/.config/sops/age/keys.txt}"

# age PUBLIC key (recipient) to encrypt to. Set this once; see README.md.
# Passed explicitly via --age so encryption does not depend on .sops.yaml discovery
# (the input .env lives outside REPO_DIR). Decryption only needs the private key.
AGE_RECIPIENT="${AGE_RECIPIENT:-age1REPLACE_WITH_YOUR_PUBLIC_KEY}"

# --- Sanity checks ----------------------------------------------------------
command -v sops >/dev/null || { echo "ERROR: sops not installed" >&2; exit 1; }
cd "$REPO_DIR"

[[ -f "$CADDYFILE" ]] || { echo "ERROR: Caddyfile not found at $CADDYFILE" >&2; exit 1; }
[[ -f "$UNIT" ]]      || { echo "ERROR: unit not found at $UNIT" >&2; exit 1; }
[[ -f "$ENV_FILE" ]]  || { echo "ERROR: env file not found at $ENV_FILE" >&2; exit 1; }

# --- Gather config ----------------------------------------------------------
cp "$CADDYFILE" ./Caddyfile
cp "$UNIT" ./scarlett-web.service

# Encrypt the .env (values become ciphertext; keys stay readable -> safe to commit).
sops --encrypt --age "$AGE_RECIPIENT" \
  --input-type dotenv --output-type dotenv "$ENV_FILE" > ./env.enc

# --- Commit + push (skip empty commits) -------------------------------------
git add -A
if git diff --cached --quiet; then
  echo "$(date -Is) no config changes; nothing to commit"
  exit 0
fi

git commit -m "config backup $(date -Is)"
git push
echo "$(date -Is) backup committed and pushed"
