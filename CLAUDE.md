# CLAUDE.md — nina.fm-website

Site web public de Nina.fm. Application Nuxt 4 + Vue 3 diffusant la webradio en continu via SSE. Interface thémée (Peak/Vinyl) avec Pinia pour l'état global et Shadcn pour l'UI.

> **Voir aussi** : `~/Sites/nina/nina.fm-apps-workspace/WORKSPACE.md` pour le contexte écosystème complet.

## Commandes

```bash
# Développement
pnpm dev              # Dev avec hot reload (http://localhost:3000)
pnpm build            # Build production (preset node_cluster)
pnpm preview          # Servir le build production

# Qualité
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier

# Versioning
pnpm changeset        # Créer un changeset
```

Utiliser **toujours** `pnpm`. Jamais `npm` ou `yarn`.

> Les conventions TypeScript, tests et architecture globales sont dans `../CLAUDE.md`.

## Architecture

### Structure des dossiers

> Organiser par feature (domaine fonctionnel), pas par type technique — voir `../CLAUDE.md`.

```
pages/
  index.vue           ← Page principale (player radio)
components/
  ui/                 ← Primitives Shadcn/Reka UI uniquement
  common/             ← Composants vraiment cross-feature (layout, overlays...)
  [feature]/          ← Composants par domaine : audio/, player/, metadata/, theming/...
themes/
  peak/               ← Thème Peak (composants + stores spécifiques)
    components/       ← Auto-importés avec préfixe `Peak`
  vinyl/              ← Thème Vinyl
    components/       ← Auto-importés avec préfixe `Vinyl`
stores/               ← Pinia stores globaux
  app.ts              ← État général de l'app
  audio.ts            ← Lecteur audio (stream, volume, état)
  browser.ts          ← Détection browser/device
  daylight.ts         ← Mode jour/nuit dynamique
  debug.ts            ← Mode debug
  loading.ts          ← État de chargement global
  metadata.ts         ← Métadonnées piste en cours (titre, artiste, artwork)
  theme.ts            ← Thème actif (peak/vinyl)
composables/
  audioElement.ts     ← Composable HTML audio element
  useFullscreen.ts    ← Gestion plein écran
server/               ← Nuxt server routes (proxy API si besoin)
assets/               ← CSS, images
public/               ← Assets statiques
```

### Pattern central : Composant → Store Pinia → API

```
Component (.vue)
  └── useXxxStore() — Pinia store
        └── $fetch / useAsyncData — nina.fm-api SSE ou REST
```

Pas de logique métier dans les composants. Les stores Pinia centralisent tout l'état.

### Stores Pinia

```typescript
// Setup syntax obligatoire — pas options API
export const useAudioStore = defineStore('audio', () => {
  // State
  const isPlaying = ref(false)
  const volume = ref(1)
  const isMuted = ref(false)

  // Getters
  const effectiveVolume = computed(() => isMuted.value ? 0 : volume.value)

  // Actions
  async function play() {
    isPlaying.value = true
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v))
  }

  return { isPlaying, volume, isMuted, effectiveVolume, play, setVolume }
})
```

**Règles Pinia :**
- Setup syntax (`defineStore('id', () => {...})`) — jamais options API
- State : `ref()` / `reactive()`
- Getters : `computed()`
- Actions : fonctions nommées (`async function` ou `function`)
- Ne jamais muter le state directement depuis les composants — passer par les actions du store

### SSE — Streaming Radio

Le stream SSE arrive depuis l'API (`NUXT_PUBLIC_API_STREAM_ENDPOINT`). Il pousse les métadonnées de la piste en cours.

```typescript
// Pattern SSE dans un store ou composable
const eventSource = new EventSource(useRuntimeConfig().public.apiStreamEndpoint)
eventSource.addEventListener('metadata', (event) => {
  const data = JSON.parse(event.data)
  metadataStore.update(data)
})
```

**Points critiques SSE :**
- `EventSource` uniquement côté client (`import.meta.client`)
- Reconnexion automatique gérée par le browser
- Nettoyer `eventSource.close()` dans `onUnmounted`

### Thèmes (Peak / Vinyl)

```
themes/peak/components/  → auto-importés avec préfixe `Peak`  (ex: <PeakPlayer />)
themes/vinyl/components/ → auto-importés avec préfixe `Vinyl` (ex: <VinylPlayer />)
```

Le thème actif est géré par `useThemeStore()`. Les composants thémés reçoivent les mêmes props — seul le rendu visuel diffère.

### Composants UI

- `components/ui/` : Shadcn/Reka UI — Button, Card, Slider, Dialog...
- Icônes : `lucide-vue-next` (tree-shakeable)

```typescript
// ✅ Correct
import { Play, Pause, Volume2 } from 'lucide-vue-next'
```

## Conventions Clés

### Pattern Composant Vue 3

```vue
<script setup lang="ts">
interface Props {
  track: Track
  isPlaying?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ play: []; pause: [] }>()

const audioStore = useAudioStore()
const displayTitle = computed(() => props.track.title ?? 'Inconnu')
</script>

<template>
  <div>
    <span v-if="isPlaying">{{ displayTitle }}</span>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>
```

- `defineProps<T>()` et `defineEmits<T>()` avec types explicites
- `computed()` pour les valeurs dérivées
- Jamais de `v-if` et `v-for` sur le même élément — utiliser un `<template>` wrapper

### SSR Safety

```typescript
// ✅ Code client uniquement
if (import.meta.client) {
  // accès window, document, EventSource...
}

// ✅ Variables d'env runtime
const config = useRuntimeConfig()
const streamUrl = config.public.audioStreamUrl
```

Toujours vérifier `import.meta.client` pour :
- `window`, `document`, `navigator`
- `EventSource`, `Audio`, `localStorage`
- Interactions DOM directes

### Path Aliases

`~` et `@` pointent vers la racine du projet.

## Variables d'Environnement

```bash
NUXT_PUBLIC_API_URL=http://localhost:4000
NUXT_PUBLIC_AUDIO_STREAM_URL=http://...       # URL du flux audio
NUXT_PUBLIC_API_STREAM_ENDPOINT=http://...    # URL SSE pour les métadonnées
```

## Docker

```bash
docker-compose up -d          # Production-like
docker-compose.prod.yml       # Config production
```
