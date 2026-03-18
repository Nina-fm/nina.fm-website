# CLAUDE.md — nina.fm-website

Site web public de Nina.fm. Nuxt 4 + Vue 3 avec SSR. Diffuse la webradio en continu via SSE. Interface thémée Peak/Vinyl avec Pinia pour l'état global.

## Commandes

```bash
pnpm dev              # Dev (http://localhost:3000)
pnpm build            # Build production (preset node_cluster)
pnpm preview

pnpm lint && pnpm lint:fix && pnpm format
pnpm changeset
```

Toujours `pnpm`. Jamais `npm` ou `yarn`.

## Structure des dossiers

```
pages/
  index.vue           ← Page principale (player radio)
components/
  ui/                 ← Primitives Shadcn/Reka UI uniquement
  common/             ← Composants cross-feature (overlays, debugger...)
  [feature]/          ← audio/, theming/, contents/, brand/...
themes/
  peak/components/    ← Auto-importés avec préfixe Peak  (ex: <PeakPlayer />)
  vinyl/components/   ← Auto-importés avec préfixe Vinyl (ex: <VinylPlayer />)
stores/               ← Pinia stores globaux (app, audio, browser, daylight, debug, loading, metadata, theme)
composables/
  audioElement.ts / useFullscreen.ts
```

## Stores existants — vérifier avant d'en créer un nouveau

| Store | Rôle |
|-------|------|
| `useAppStore` | État général de l'app |
| `useAudioStore` | Lecteur audio (stream, volume, play/pause) |
| `useBrowserStore` | Détection browser/device |
| `useDaylightStore` | Mode jour/nuit dynamique |
| `useMetadataStore` | Métadonnées piste en cours (SSE) |
| `useThemeStore` | Thème actif (peak/vinyl) |

## Conventions clés

- Pattern : Composant → `useXxxStore()` (Pinia) → `$fetch`/SSE
- Stores Pinia : setup syntax TOUJOURS — `defineStore('id', () => {...})`
- `computed()` pour les getters dérivés, jamais de variable locale recalculée
- Jamais muter le state depuis les composants — passer par les actions du store
- `defineProps<T>()` et `defineEmits<T>()` avec types génériques — jamais options API
- Jamais `v-if` et `v-for` sur le même élément — utiliser `<template>` wrapper
- Icônes : `import { Play, Pause } from 'lucide-vue-next'` — jamais d'import global
- `~` et `@` → racine du projet

## Thèmes Peak / Vinyl

Les composants dans `themes/peak/components/` et `themes/vinyl/components/` sont auto-importés avec leur préfixe. Le thème actif est géré par `useThemeStore()`. Les composants thémés reçoivent les mêmes props — seul le rendu visuel diffère.

## SSR Safety (app avec SSR activé)

```typescript
// APIs browser — toujours dans import.meta.client
if (import.meta.client) {
  window.addEventListener(...)
  const es = new EventSource(url)  // SSE toujours côté client
}

// Variables d'env runtime — jamais process.env
const config = useRuntimeConfig()
const streamUrl = config.public.audioStreamUrl
```

Toujours vérifier `import.meta.client` pour : `window`, `document`, `navigator`, `EventSource`, `Audio`, `localStorage`.

## Variables d'environnement

```bash
NUXT_PUBLIC_API_URL=http://localhost:4000
NUXT_PUBLIC_AUDIO_STREAM_URL=http://...       # Flux audio
NUXT_PUBLIC_API_STREAM_ENDPOINT=http://...    # SSE métadonnées
```
