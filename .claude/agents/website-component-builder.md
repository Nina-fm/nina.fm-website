---
name: website-component-builder
description: Crée des composants Vue 3 et des stores Pinia pour nina.fm-website. Invoquer pour tout nouveau composant, store, ou feature (player, thèmes, métadonnées).
tools: Read, Write, Edit, Glob, Grep
---

# Component & Store Builder — nina.fm-website

## Pattern Store Pinia

```typescript
// stores/[name].ts — setup syntax obligatoire
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  // State — ref() ou reactive()
  const isPlaying = ref(false)
  const volume = ref(1)
  const isMuted = ref(false)
  const currentTime = ref(0)

  // Getters — computed()
  const effectiveVolume = computed(() => isMuted.value ? 0 : volume.value)
  const isActive = computed(() => isPlaying.value || currentTime.value > 0)

  // Actions — fonctions nommées (async si besoin)
  async function play() {
    isPlaying.value = true
  }

  function pause() {
    isPlaying.value = false
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v))
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  return { isPlaying, volume, isMuted, currentTime, effectiveVolume, isActive, play, pause, setVolume, toggleMute }
})
```

**Règles Pinia :**
- Setup syntax TOUJOURS — jamais options API (`state: () => ({})`)
- State : `ref()` / `reactive()`, Getters : `computed()`, Actions : fonctions nommées
- Jamais muter le state directement depuis les composants — passer par les actions
- ID du store = nom en camelCase : `'audio'`, `'metadata'`, `'theme'`

## Stores existants — vérifier avant d'en créer un nouveau

| Store | Rôle |
|-------|------|
| `useAppStore` | État général de l'app |
| `useAudioStore` | Lecteur audio (stream, volume, état) |
| `useBrowserStore` | Détection browser/device |
| `useDaylightStore` | Mode jour/nuit dynamique |
| `useDebugStore` | Mode debug |
| `useLoadingStore` | État de chargement global |
| `useMetadataStore` | Métadonnées piste en cours (titre, artiste, artwork) |
| `useThemeStore` | Thème actif (peak/vinyl) |

## Pattern Composant Vue 3

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  track: Track
  isPlaying?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  play: []
  pause: []
}>()

// Store — accès via composable
const audioStore = useAudioStore()

// State local
const isHovered = ref(false)

// Dérivations — toujours computed()
const displayTitle = computed(() => props.track.title ?? 'Inconnu')
const isActive = computed(() => props.isPlaying && audioStore.isPlaying)

// Handlers
const handlePlay = () => emit('play')
</script>

<template>
  <div :class="cn('flex items-center gap-2', { 'opacity-50': !isActive })">
    <span v-if="isActive">{{ displayTitle }}</span>
    <ul>
      <!-- v-for et v-if jamais sur le même élément — wrapper template -->
      <template v-for="item in items" :key="item.id">
        <li v-if="item.visible">{{ item.name }}</li>
      </template>
    </ul>
  </div>
</template>
```

## Composants thémés (Peak/Vinyl)

```typescript
// themes/peak/components/PeakPlayer.vue
// themes/vinyl/components/VinylPlayer.vue

// Auto-importés avec leur préfixe — usage dans le template :
// <PeakPlayer /> ou <VinylPlayer />

// Sélection dynamique via le store
const themeStore = useThemeStore()
// themeStore.active === 'peak' | 'vinyl'
```

Les composants thémés reçoivent les mêmes props — seul le rendu visuel diffère. La logique métier reste dans les stores.

## Icônes Lucide

```typescript
// ✅ Named imports tree-shakeable
import { Play, Pause, Volume2, VolumeX } from 'lucide-vue-next'

// ❌ Import global interdit
import * as LucideIcons from 'lucide-vue-next'
```

## SSR Safety

Le website utilise le SSR (contrairement à faceb). Garder en tête :

```typescript
// APIs browser — toujours garder côté client
if (import.meta.client) {
  window.addEventListener(...)
  const audio = new Audio()
}

// Variables d'env runtime — jamais process.env
const config = useRuntimeConfig()
const streamUrl = config.public.audioStreamUrl
```

Toujours vérifier `import.meta.client` pour : `window`, `document`, `navigator`, `EventSource`, `Audio`, `localStorage`.
