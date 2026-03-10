import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { transformMixtapeToMetadata } from '~/lib/metadata/transformMixtapeToMetadata'
import { SseClient } from '~/lib/sse/SseClient'

export const useMetadataStore = defineStore('metadata', () => {
  const config = useRuntimeConfig()

  const metadata = ref<Metadata | null>(null)
  const progress = ref<number>(0)
  const listeners = ref<number>(0)
  const type = ref<'mixtape' | 'track' | null>(null)

  const isMixtape = computed(() => type.value === 'mixtape')

  /**
   * Écoute le SSE /stream/metadata pour les changements de piste (mixtape ou track)
   * Émet uniquement quand la piste change (~30min-2h)
   */
  const metadataClient = new SseClient<MetadataStreamDto>(
    `${config.public.apiUrl}${config.public.apiStreamEndpoint}/metadata`,
    (data) => {
      if (data.type === 'mixtape' && data.mixtape) {
        metadata.value = transformMixtapeToMetadata(data.mixtape)
        type.value = 'mixtape'
      } else if (data.type === 'track' && data.track) {
        metadata.value = {
          id: '',
          authors_text: data.track.artist,
          name: data.track.title,
        }
        type.value = 'track'
      } else {
        metadata.value = null
      }
    },
  )

  /**
   * Écoute le SSE /stream/activity pour progress + listeners
   * Émet toutes les 3s, sans query DB
   */
  const activityClient = new SseClient<ActivityStreamDto>(
    `${config.public.apiUrl}${config.public.apiStreamEndpoint}/activity`,
    (data) => {
      progress.value = data.progress
      listeners.value = data.listeners
    },
  )

  onNuxtReady(() => {
    metadataClient.connect()
    activityClient.connect()
  })

  onScopeDispose(() => {
    metadataClient.disconnect()
    activityClient.disconnect()
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
