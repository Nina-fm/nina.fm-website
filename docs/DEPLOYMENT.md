# Migration vers l'Architecture Docker Nina.fm

## ✅ Fichiers créés/modifiés

1. **`Dockerfile`** - Multi-stage avec development et production
2. **`docker-compose.prod.yml`** - Configuration production avec GHCR
3. **`.github/workflows/cd.yml`** - Workflow complet conforme à l'architecture Nina.fm
4. **`.env.example`** - Documentation des variables d'environnement

## 🏗️ Architecture Nina.fm

L'architecture suit le même pattern que le Mixtaper :

```
┌─────────────────────────────────────────────────────────┐
│ GitHub Actions (on push main)                           │
├─────────────────────────────────────────────────────────┤
│ 1. Test (lint, type-check)                             │
│ 2. Build (yarn build)                                   │
│ 3. Docker Build & Push → ghcr.io/nina-fm/nina.fm-website│
│ 4. Deploy via SSH                                       │
│    - Pull image depuis GHCR                             │
│    - Créer .env.prod sur serveur                        │
│    - docker compose up -d                               │
│ 5. Cleanup (images anciennes)                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Serveur Digital Ocean                                   │
├─────────────────────────────────────────────────────────┤
│ /var/nina/website/                                      │
│   ├── .env.prod           # Variables d'environnement   │
│   └── deploy/             # Dossier de déploiement      │
│       └── docker-compose.yml (téléchargé depuis GitHub) │
│                                                          │
│ Réseau Docker : nina-network (partagé entre services)   │
│ Port : 127.0.0.1:3000 → nginx reverse proxy             │
└─────────────────────────────────────────────────────────┘
```

## 📋 Configuration GitHub (à faire)

### Secrets à ajouter dans GitHub

**Settings → Secrets and variables → Actions → Secrets**

```
SERVER_HOST           # IP ou domaine du serveur (ex: 1.2.3.4)
SERVER_USER           # Utilisateur SSH (ex: nina)
SSH_PRIVATE_KEY       # Clé SSH privée pour se connecter
VERSIONING_TOKEN      # Token GitHub pour push de tags (utilise GITHUB_TOKEN par défaut)
```

### Variables à ajouter dans GitHub

**Settings → Secrets and variables → Actions → Variables**

```
NUXT_PUBLIC_AUDIO_STREAM_URL        # https://flux.nina.fm/nina.mp3
NUXT_PUBLIC_API_URL                 # https://api.nina.fm
NUXT_PUBLIC_API_STREAM_ENDPOINT     # /stream
```

## 🚀 Étapes de migration

### 1. Configuration GitHub (une fois)

1. Aller sur `https://github.com/nina-fm/nina.fm-website2/settings/secrets/actions`
2. Ajouter les secrets listés ci-dessus
3. Ajouter les variables listées ci-dessus

### 2. Préparation serveur (une fois)

```bash
# SSH sur le serveur
ssh nina@your-server-ip

# Créer la structure pour le website
sudo mkdir -p /var/nina/website/deploy
sudo chown -R nina:nina /var/nina/website

# S'assurer que le réseau Docker existe
docker network create nina-network 2>/dev/null || echo "Réseau existe déjà"

# Vérifier que l'utilisateur nina existe et est dans le groupe docker
sudo usermod -aG docker nina
```

### 3. Mise à jour Nginx

Le conteneur écoute sur `127.0.0.1:3000`. Nginx doit pointer vers ce port.

**Nouveau fichier : `/etc/nginx/sites-enabled/www.nina.fm.conf`**

```nginx
server {
    server_name nina.fm;
    return 301 $scheme://www.nina.fm$request_uri;

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/www.nina.fm/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.nina.fm/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    server_name www.nina.fm;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/www.nina.fm/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.nina.fm/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = www.nina.fm) {
        return 301 https://$host$request_uri;
    }
    server_name www.nina.fm;
    listen 80;
    return 404;
}

server {
    if ($host = nina.fm) {
        return 301 https://$host$request_uri;
    }
    server_name nina.fm;
    listen 80;
    return 404;
}
```

```bash
# Tester la config Nginx
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

### 4. Arrêt de PM2

Une fois que Docker fonctionne :

```bash
# Lister les process PM2
pm2 list

# Arrêter nina-website
pm2 stop nina-website
pm2 delete nina-website
pm2 save
```

### 5. Premier déploiement

```bash
# En local, pusher sur main
git add .
git commit -m "feat: migrate to Docker architecture"
git push origin main
```

Le workflow GitHub Actions va automatiquement :

1. Tester le code
2. Builder l'image Docker
3. Pusher vers GHCR
4. Déployer sur le serveur
5. Nettoyer les anciennes images

### 6. Vérification sur le serveur

```bash
# SSH sur le serveur
ssh nina@your-server-ip

# Vérifier que le conteneur tourne
docker ps | grep nina-website

# Voir les logs
docker logs nina-website -f

# Tester localement
curl http://localhost:3000
```

## 🔍 Commandes utiles

### Sur le serveur

```bash
# Logs en temps réel
docker logs nina-website -f

# Redémarrer le conteneur
docker restart nina-website

# Voir le status
docker ps | grep nina-website
docker stats nina-website

# Inspecter le healthcheck
docker inspect nina-website | grep -A 10 Health

# Entrer dans le conteneur
docker exec -it nina-website sh

# Nettoyer les anciennes images
docker image prune -f
```

### Réseau nina-network

```bash
# Lister les conteneurs sur le réseau
docker network inspect nina-network

# Voir tous les conteneurs Nina.fm
docker ps | grep nina-
```

## 🐛 Troubleshooting

### Le build GitHub échoue

Vérifier que toutes les variables/secrets GitHub sont configurés :

- Settings → Secrets and variables → Actions

### Le conteneur ne démarre pas sur le serveur

```bash
# Voir les logs détaillés
docker logs nina-website

# Vérifier les variables d'environnement
cat /var/nina/website/.env.prod

# Vérifier que le réseau existe
docker network ls | grep nina-network
```

### L'application ne répond pas

```bash
# Vérifier que le port n'est pas déjà utilisé
sudo lsof -i :3000

# Vérifier PM2 (s'il tourne encore)
pm2 list
pm2 stop all  # Si besoin
```

## 📊 Différences avec l'ancienne architecture

| Aspect              | Avant (PM2)                           | Après (Docker)                                 |
| ------------------- | ------------------------------------- | ---------------------------------------------- |
| **Build**           | Sur serveur via SSH                   | Sur GitHub Actions + push image GHCR           |
| **Déploiement**     | `git pull + yarn build + pm2 restart` | `docker pull + docker compose up -d`           |
| **Process Manager** | PM2                                   | Docker (restart policy)                        |
| **Logs**            | PM2 logs                              | Docker logs                                    |
| **Variables env**   | Sur serveur dans `.env`               | Sur serveur dans `/var/nina/website/.env.prod` |
| **Isolation**       | Process Node.js                       | Conteneur Docker                               |
| **Réseau**          | localhost:3000                        | nina-network → 127.0.0.1:3000                  |

## 📈 Avantages de la nouvelle architecture

✅ **Cohérence** : Même pattern que Mixtaper et futures apps  
✅ **Isolation** : Chaque service dans son conteneur  
✅ **Reproductibilité** : Image Docker identique partout  
✅ **Scalabilité** : Facile d'ajouter de nouveaux services  
✅ **CI/CD** : Build et tests automatiques  
✅ **Rollback** : Facile de revenir à une version précédente  
✅ **Réseau partagé** : Communication inter-services simplifiée

## 🔐 Sécurité

- ✅ Utilisateur non-root dans le conteneur (`nuxtjs`)
- ✅ Port exposé uniquement sur localhost (`127.0.0.1:3000`)
- ✅ Fichiers `.env.prod` avec permissions restrictives (600)
- ✅ Secrets GitHub pour données sensibles
- ✅ Images stockées sur GHCR (GitHub Container Registry)

## 📝 Prochaines étapes

1. ✅ Migration du website vers Docker
2. ⬜ Tester le déploiement complet
3. ⬜ Vérifier que tout fonctionne (stream, SSE, API)
4. ⬜ Arrêter définitivement PM2
5. ⬜ Nettoyer l'ancien dossier `~/apps/nina.fm-website` (optionnel)
6. ⬜ Documenter dans le wiki Nina.fm
