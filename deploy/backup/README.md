# scarlett-web config backup

Backs up the server-side config that is **not** in the application repo, into a
**private git repo**, on a nightly cron. The `.env` is encrypted with **SOPS + age**
before it touches git, so the repo is safe even if it leaks.

What gets backed up:

| File | In git as | Encrypted? |
|------|-----------|------------|
| `/etc/caddy/Caddyfile` | `Caddyfile` | no (no secrets) |
| `/etc/systemd/system/scarlett-web.service` | `scarlett-web.service` | no (no secrets) |
| service `.env` (from the unit's `EnvironmentFile=`) | `env.enc` | yes (SOPS/age) |

> The app itself is **not** backed up here — its source is in the main git repo and
> `.next/standalone` is regenerable with `npm run build`.

---

## One-time setup (run on the server)

1. **Install tooling**
   ```sh
   sudo apt update && sudo apt install -y age git
   # sops: grab the latest release binary for your arch
   SOPS_VER=v3.9.4
   curl -fsSL -o /tmp/sops "https://github.com/getsops/sops/releases/download/${SOPS_VER}/sops-${SOPS_VER}.linux.amd64"
   sudo install -m 0755 /tmp/sops /usr/local/bin/sops
   ```

2. **Generate the age keypair**
   ```sh
   mkdir -p ~/.config/sops/age
   age-keygen -o ~/.config/sops/age/keys.txt
   chmod 600 ~/.config/sops/age/keys.txt
   grep 'public key' ~/.config/sops/age/keys.txt   # copy the age1... value
   ```
   **⚠ Durability:** copy `keys.txt` somewhere off this server (password manager, or
   your Mac at `~/.config/sops/age/`). If the server dies and the key was only on it,
   `env.enc` is permanently undecryptable.

3. **Create the backup repo**
   ```sh
   sudo mkdir -p /opt/scarlett-config-backup && sudo chown "$USER" /opt/scarlett-config-backup
   cd /opt/scarlett-config-backup
   git init
   git remote add origin git@github.com:<you>/scarlett-config-backup.git   # PRIVATE repo
   ```

4. **Drop in the files from this folder**
   ```sh
   cp /path/to/deploy/backup/backup-config.sh .
   cp /path/to/deploy/backup/gitignore.template .gitignore
   chmod +x backup-config.sh
   ```
   Edit `backup-config.sh` and set `AGE_RECIPIENT=` to your **public** key from step 2.
   (Verify `REPO_DIR`, `CADDYFILE`, `UNIT` paths match this server.)

5. **First run + push**
   ```sh
   ./backup-config.sh
   git push -u origin main
   ```

6. **Schedule the cron** (as the user that can read the config files; use `sudo crontab -e`
   if root ownership is needed):
   ```
   30 3 * * *  /opt/scarlett-config-backup/backup-config.sh >> /var/log/scarlett-backup.log 2>&1
   ```

---

## Restore (on a fresh server)

```sh
git clone git@github.com:<you>/scarlett-config-backup.git /opt/scarlett-config-backup
mkdir -p ~/.config/sops/age && cp /your/offsite/keys.txt ~/.config/sops/age/keys.txt
cd /opt/scarlett-config-backup

# decrypt secrets back into place
SOPS_AGE_KEY_FILE=~/.config/sops/age/keys.txt sops --decrypt env.enc > /opt/scarlett-web/.env

# restore config
sudo cp Caddyfile /etc/caddy/Caddyfile
sudo cp scarlett-web.service /etc/systemd/system/scarlett-web.service
sudo systemctl daemon-reload && sudo systemctl enable --now scarlett-web
sudo systemctl reload caddy
```

---

## Verify it works

```sh
./backup-config.sh                                   # 1. lands a commit on the remote
grep -q 'ENC\[' env.enc && echo "values encrypted"   # 2. secrets are ciphertext
sops --decrypt env.enc | diff - /opt/scarlett-web/.env   # 3. round-trips cleanly
./backup-config.sh                                   # 4. second run = no new commit
git status                                            # 5. cleartext .env never tracked
```
