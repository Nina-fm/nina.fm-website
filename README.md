# 📻  Nina.fm - Website

![Nuxt](https://img.shields.io/badge/NuxtJS-020420?logo=nuxt&color=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&color=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&color=black)
[![Coverage](https://codecov.io/gh/nina-fm/nina.fm-website/graph/badge.svg?token=AO0UHDQ9FY)](https://codecov.io/gh/nina-fm/nina.fm-website)
[![Deploy](https://github.com/nina-fm/nina.fm-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/nina-fm/nina.fm-website/actions/workflows/deploy.yml)

Site web public de Nina.fm. Diffuse la webradio en temps réel via SSE avec un player thémé (Peak / Vinyl).

## Stack

- **[Nuxt 4](https://nuxt.com/)** + Vue 3 — SSR activé
- **[Pinia](https://pinia.vuejs.org/)** — état global (audio, métadonnées, thème…)
- **[Tailwind CSS](https://tailwindcss.com/)** — styling
- **SuperTokens** — authentification
- **SSE** — métadonnées en temps réel depuis `nina.fm-api`

## Démarrage rapide

```bash
# Infrastructure (depuis le workspace)
make dev

pnpm install
cp .env.example .env
pnpm dev
# → http://localhost:3000
```

## Scripts

```bash
pnpm dev          # Développement avec hot-reload
pnpm build        # Build production
pnpm preview      # Aperçu du build

pnpm lint && pnpm lint:fix && pnpm format
pnpm changeset
```

## Variables d'environnement

```bash
NUXT_PUBLIC_API_URL=http://localhost:4000
NUXT_PUBLIC_AUDIO_STREAM_URL=http://...       # Flux audio IceCast
NUXT_PUBLIC_API_STREAM_ENDPOINT=http://...    # SSE métadonnées
```

Voir `.env.example` pour la liste complète.
