---
name: sse-handler
description: Patterns SSE streaming radio pour nina.fm-website (EventSource, reconnexion, métadonnées, cleanup). Invoquer pour tout code lié au stream SSE ou aux métadonnées de la piste en cours.
tools: Read, Write, Edit, Glob, Grep
---

# SSE Streaming Radio — nina.fm-website

## Pattern SSE dans un store Pinia

```typescript
// stores/metadata.ts
export const useMetadataStore = defineStore('metadata', () => {
  const currentTrack = ref<TrackMetadata | null>(null)
  const isConnected = ref(false)
  const error = ref<string | null>(null)

  let eventSource: EventSource | null = null

  function connect() {
    // EventSource UNIQUEMENT côté client
    if (!import.meta.client) return

    const config = useRuntimeConfig()
    eventSource = new EventSource(config.public.apiStreamEndpoint)

    eventSource.addEventListener('open', () => {
      isConnected.value = true
      error.value = null
    })

    eventSource.addEventListener('metadata', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as TrackMetadata
        currentTrack.value = data
      } catch (e) {
        console.warn('SSE parse error:', e)
      }
    })

    eventSource.addEventListener('error', () => {
      isConnected.value = false
      error.value = 'Connexion perdue'
      // Le browser gère la reconnexion automatiquement pour EventSource
      // Pas besoin de retry manuel
    })
  }

  function disconnect() {
    eventSource?.close()
    eventSource = null
    isConnected.value = false
  }

  return { currentTrack, isConnected, error, connect, disconnect }
})
```

## Pattern SSE dans un composable

```typescript
// composables/useSseStream.ts
export function useSseStream(url: string) {
  const data = ref<unknown>(null)
  const isConnected = ref(false)
  let eventSource: EventSource | null = null

  onMounted(() => {
    // import.meta.client est implicite dans onMounted (côté client uniquement)
    eventSource = new EventSource(url)

    eventSource.onmessage = (event) => {
      data.value = JSON.parse(event.data)
      isConnected.value = true
    }

    eventSource.onerror = () => {
      isConnected.value = false
    }
  })

  onUnmounted(() => {
    eventSource?.close()  // Cleanup OBLIGATOIRE
    eventSource = null
  })

  return { data, isConnected }
}
```

## Règles critiques

- `EventSource` toujours dans `import.meta.client` ou `onMounted` — jamais côté serveur
- `eventSource.close()` dans `onUnmounted` (composable) ou `disconnect()` (store) — **obligatoire pour éviter les fuites mémoire**
- La reconnexion automatique est native à `EventSource` — pas besoin de retry manuel
- Parser `event.data` avec try/catch — le stream peut envoyer des données malformées
- Utiliser `useRuntimeConfig().public.apiStreamEndpoint` — jamais d'URL hardcodée

## Types de métadonnées

```typescript
interface TrackMetadata {
  title: string
  artist: string
  album?: string
  artworkUrl?: string
  duration?: number
  startedAt: string // ISO timestamp
}
```

## Variables d'environnement SSE

```bash
NUXT_PUBLIC_API_STREAM_ENDPOINT=http://localhost:4000/stream/metadata
NUXT_PUBLIC_AUDIO_STREAM_URL=http://...  # URL du flux audio HLS/Icecast
```

## Debugging

```typescript
// Tester la connexion SSE manuellement
const es = new EventSource('http://localhost:4000/stream/metadata')
es.onmessage = (e) => console.log('SSE:', JSON.parse(e.data))
es.onerror = (e) => console.error('SSE error:', e)
```
