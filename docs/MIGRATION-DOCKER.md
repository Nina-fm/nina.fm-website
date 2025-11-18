# Migration PM2 → Docker - Nina.fm Website

## 📋 Contexte

Ce guide décrit la migration du déploiement de `nina.fm-website` depuis PM2 vers Docker, tout en conservant le système de déploiement via GitHub Actions.

## 🎯 Objectifs

- Dockeriser l'application Nuxt 3
- Automatiser le déploiement via GitHub Actions
- Permettre une cohabitation temporaire PM2/Docker
- Préparer la migration complète vers une architecture Docker

## 📦 Fichiers créés

### 1. `Dockerfile`

Dockerfile multi-stage optimisé pour la production :

- **Stage 1 (deps)** : Installation des dépendances
- **Stage 2 (builder)** : Build de l'application Nuxt
- **Stage 3 (runner)** : Image finale légère avec uniquement les fichiers nécessaires

### 2. `docker-compose.yml`

Orchestration du conteneur avec :

- Configuration des variables d'environnement
- Port mapping (3000:3000)
- Healthcheck automatique
- Gestion des logs
- Network isolé

### 3. `.dockerignore`

Optimisation de l'image en excluant les fichiers inutiles

### 4. `deploy-docker.sh` (optionnel)

Script bash pour faciliter le déploiement manuel et le debug local

### 5. `.github/workflows/cd.yml` (modifié)

Workflow GitHub Actions mis à jour pour le déploiement Docker automatique

## 🚀 Étapes de Migration

### Phase 1 : Préparation sur le serveur

#### 1.1 Installer Docker et Docker Compose (si pas déjà fait)

```bash
# SSH sur le serveur
ssh vincent@your-server-ip

# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Vérifier l'installation
docker --version
docker compose version
```

#### 1.2 Créer le fichier `.env` sur le serveur

```bash
cd ~/apps/nina.fm-website

# Créer le fichier .env avec les variables d'environnement
cat > .env << EOF
NUXT_PUBLIC_AUDIO_STREAM_URL=https://flux.nina.fm/nina.mp3
NUXT_PUBLIC_STREAM_SSE_URL=your_sse_url
NUXT_PUBLIC_API_URL=your_api_url
NUXT_PUBLIC_API_METADATA_ENDPOINT=/metadata/show
NUXT_PUBLIC_API_KEY=your_api_key
EOF

# Sécuriser le fichier
chmod 600 .env
```

### Phase 2 : Test en local (optionnel)

```bash
# Sur votre machine locale
cd ~/Sites/nina/nina.fm-website

# Créer un .env local
cp .env.example .env  # ou créer le fichier avec vos valeurs

# Tester le build Docker
docker-compose build

# Tester le démarrage
docker-compose up

# Vérifier que l'app répond sur http://localhost:3000
curl http://localhost:3000

# Arrêter
docker-compose down
```

### Phase 3 : Premier déploiement Docker

#### 3.1 Déploiement manuel initial

```bash
# SSH sur le serveur
ssh vincent@your-server-ip
cd ~/apps/nina.fm-website

# Pull des dernières modifications
git pull

# Premier build et lancement
docker-compose build
docker-compose up -d

# Vérifier les logs
docker-compose logs -f

# Vérifier le status
docker-compose ps
docker ps | grep nina-website

# Tester l'application
curl http://localhost:3000
```

#### 3.2 Mise à jour Nginx (cohabitation PM2/Docker)

Pour permettre une transition en douceur, vous pouvez temporairement changer le port de l'application Docker (ex: 3001) et tester via un sous-domaine.

**Option A : Bascule directe (recommandé si tout fonctionne)**

```nginx
# /etc/nginx/sites-enabled/www.nina.fm.conf
server {
  server_name www.nina.fm;

  location / {
    proxy_pass http://localhost:3000;  # Port Docker (identique à PM2)
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
```

**Option B : Test parallèle (si vous voulez être prudent)**

Modifiez `docker-compose.yml` pour utiliser le port 3001 :

```yaml
ports:
  - '3001:3000' # Map port 3001 externe vers 3000 interne
```

Créez un sous-domaine de test :

```nginx
# /etc/nginx/sites-enabled/docker.nina.fm.conf
server {
  server_name docker.nina.fm;

  location / {
    proxy_pass http://localhost:3001;  # Port Docker de test
    # ... mêmes directives proxy que ci-dessus
  }

  listen 443 ssl;
  ssl_certificate /etc/letsencrypt/live/www.nina.fm/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/www.nina.fm/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

Puis tester avec `https://docker.nina.fm` avant de basculer.

```bash
# Recharger Nginx après modification
sudo nginx -t
sudo systemctl reload nginx
```

### Phase 4 : Arrêt de PM2

Une fois que Docker fonctionne correctement :

```bash
# Arrêter PM2
pm2 stop nina-website
pm2 delete nina-website
pm2 save

# Optionnel : désinstaller PM2 si plus utilisé
# npm uninstall -g pm2
```

### Phase 5 : Déploiement automatique via GitHub Actions

Une fois les modifications pushées sur `main`, le workflow GitHub Actions se déclenchera automatiquement et :

1. Se connectera au serveur via SSH
2. Pullera les dernières modifications
3. Stoppera l'ancien conteneur
4. Buildra la nouvelle image
5. Démarrera le nouveau conteneur
6. Nettoiera les anciennes images

## 🔍 Commandes utiles

### Gestion Docker

```bash
# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs des dernières 100 lignes
docker-compose logs --tail=100

# Redémarrer le conteneur
docker-compose restart

# Stopper le conteneur
docker-compose down

# Rebuilder et redémarrer
docker-compose up -d --build

# Voir le status
docker-compose ps
docker stats nina-website

# Inspecter le healthcheck
docker inspect --format='{{json .State.Health}}' nina-website | jq '.'

# Entrer dans le conteneur
docker exec -it nina-website sh

# Nettoyer les images inutilisées
docker image prune -f
docker system prune -f
```

### Script de déploiement (si vous l'utilisez)

```bash
# Rendre le script exécutable
chmod +x deploy-docker.sh

# Déploiement complet
./deploy-docker.sh deploy

# Voir les logs
./deploy-docker.sh logs

# Voir le status
./deploy-docker.sh status
```

## 🔒 Sécurité

### Variables d'environnement

- ✅ Fichier `.env` créé sur le serveur (non versionné)
- ✅ Permissions restreintes : `chmod 600 .env`
- ✅ Variables chargées automatiquement par docker-compose

### Utilisateur non-root

Le Dockerfile crée un utilisateur `nuxtjs` non-root pour exécuter l'application, renforçant la sécurité.

## 📊 Monitoring

### Healthcheck

Docker effectue un healthcheck toutes les 30 secondes :

- Vérifie que l'application répond sur le port 3000
- Redémarre automatiquement si l'application ne répond plus (selon la policy restart)

### Logs

Les logs sont limités à :

- Taille max par fichier : 10 MB
- Nombre max de fichiers : 3
- Total : ~30 MB de logs conservés

## 🐛 Troubleshooting

### Le conteneur ne démarre pas

```bash
# Voir les logs détaillés
docker-compose logs nina-website

# Vérifier les variables d'environnement
docker-compose config

# Vérifier que le port 3000 n'est pas déjà utilisé
sudo netstat -tulpn | grep 3000
# ou
sudo lsof -i :3000
```

### PM2 bloque encore le port 3000

```bash
# Lister les process PM2
pm2 list

# Stopper tous les process PM2
pm2 stop all

# Ou killer PM2 complètement
pm2 kill
```

### Erreur de build

```bash
# Rebuilder sans cache
docker-compose build --no-cache

# Vérifier l'espace disque
df -h
```

### L'application ne répond pas

```bash
# Vérifier le healthcheck
docker inspect nina-website | grep -A 10 Health

# Entrer dans le conteneur
docker exec -it nina-website sh
# Puis tester
wget -O- http://localhost:3000
```

## 🔄 Rollback

Si quelque chose ne va pas, vous pouvez rapidement revenir à PM2 :

```bash
# Stopper Docker
docker-compose down

# Redémarrer PM2
cd ~/apps/nina.fm-website
yarn install
yarn build
pm2 start ecosystem.config.cjs
pm2 save
```

## 📈 Prochaines étapes

1. ✅ Migration du site web vers Docker
2. ⬜ Migration des autres services (API, SSE server, etc.) vers Docker
3. ⬜ Orchestration complète avec Docker Compose (tous les services)
4. ⬜ Mise en place d'un reverse proxy centralisé (Traefik ou Nginx Proxy Manager)
5. ⬜ CI/CD plus avancé avec tests automatisés
6. ⬜ Monitoring avec Prometheus + Grafana (optionnel)

## 📝 Notes

- Le workflow GitHub Actions actuel nécessite que Docker et Docker Compose soient installés sur le serveur
- Les secrets GitHub (`HOST`, `USERNAME`, `PRIVATE_KEY`) restent inchangés
- Le fichier `.env` doit être créé manuellement sur le serveur (une seule fois)
- Le script `deploy-docker.sh` est optionnel, utile pour le debug local
