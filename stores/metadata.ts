import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'

export const useMetadataStore = defineStore('metadata', () => {
  const config = useRuntimeConfig()

  const isListeningMetadata = ref<boolean>(false)
  const isListeningActivity = ref<boolean>(false)
  const metadata = ref<Metadata | null>(null)
  const progress = ref<number>(0)
  const listeners = ref<number>(0)

  const isMixtape = computed(() => !!metadata.value)

  /**
   * Écoute le SSE /stream/metadata pour les changements de piste (mixtape ou track)
   * Émet uniquement quand la piste change (~30min-2h)
   */
  const listenSSEMetadata = () => {
    if (!isListeningMetadata.value) {
      const events = new EventSource(`${config.public.apiUrl}${config.public.apiStreamEndpoint}/metadata`)

      events.onerror = () => {
        setTimeout(listenSSEMetadata, 3000)
      }

      events.onmessage = (event) => {
        const data: MetadataStreamDto = JSON.parse(event.data)

        if (data.type === 'mixtape' && data.mixtape) {
          // Transformer MixtapeMetadataDto en Metadata (format website)
          metadata.value = transformMixtapeToMetadata(data.mixtape)
        } else if (data.type === 'track' && data.track) {
          // Track simple (Artist - Title)
          metadata.value = null // Pas de métadonnées enrichies
        } else {
          // Format inconnu
          metadata.value = null
        }
      }

      isListeningMetadata.value = true
    }
  }

  /**
   * Écoute le SSE /stream/activity pour progress + listeners
   * Émet toutes les 3s, sans query DB
   */
  const listenSSEActivity = () => {
    if (!isListeningActivity.value) {
      const events = new EventSource(`${config.public.apiUrl}${config.public.apiStreamEndpoint}/activity`)

      events.onerror = () => {
        setTimeout(listenSSEActivity, 3000)
      }

      events.onmessage = (event) => {
        const data: ActivityStreamDto = JSON.parse(event.data)
        progress.value = data.progress
        listeners.value = data.listeners
      }

      isListeningActivity.value = true
    }
  }

  onNuxtReady(() => {
    listenSSEMetadata()
    listenSSEActivity()
  })

  return {
    metadata,
    progress,
    listeners,
    isMixtape,
  }
})

export const useMetadataStoreRefs = () => storeToRefs(useMetadataStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useMetadataStore, import.meta.hot))
}
