import { acceptHMRUpdate, defineStore } from 'pinia'

import { decode } from 'html-entities'

interface Query {
  authors?: string
  name?: string
}

interface Info {
  current: {
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const useMetadataStore = defineStore('metadata', () => {
  const config = useRuntimeConfig()

  const isListeningEvents = ref<boolean>(false)
  const isListeningProgress = ref<boolean>(false)
  const isListeningListeners = ref<boolean>(false)
  const iceCastData = ref<Obj | null>(null)
  const airTimeData = ref<Info | null>(null)
  const metadata = ref<Metadata | null>(null)
  const liveQuery = ref<Query | undefined>()
  const progress = ref<number>(0)
  const listeners = ref<number>(0)

  const isMixtape = computed(() => !!metadata.value)

  const fetchMetadata = async () => {
    const fetchData: Obj | null = await $fetch(`${config.public.apiUrl}${config.public.apiMetadataEndpoint}`, {
      query: liveQuery.value,
      headers: {
        Authorization: `Bearer ${config.public.apiKey}`,
      },
    })

    metadata.value = fetchData as unknown as Metadata
  }

  const updateQuery = () => {
    if (airTimeData.value) {
      const [authors, name] = decode(airTimeData.value?.current?.name).split(' - ')
      const query = { authors, name }
      liveQuery.value = query
    } else {
      liveQuery.value = undefined
    }
  }

  const listenSSEListeners = () => {
    if (!isListeningListeners.value) {
      const events = new EventSource(`${config.public.streamSseUrl}/listeners`)

      events.onerror = () => {
        setTimeout(listenSSEListeners, 3000)
      }
      events.onmessage = (event) => {
        listeners.value = JSON.parse(event.data)
      }

      isListeningListeners.value = true
    }
  }

  const listenSSEProgress = () => {
    if (!isListeningProgress.value) {
      const events = new EventSource(`${config.public.streamSseUrl}/progress`)

      events.onerror = () => {
        setTimeout(listenSSEProgress, 3000)
      }
      events.onmessage = (event) => {
        progress.value = JSON.parse(event.data)
      }

      isListeningProgress.value = true
    }
  }

  const listenSSEEvents = () => {
    if (!isListeningEvents.value) {
      const events = new EventSource(`${config.public.streamSseUrl}/events`)

      events.onerror = () => {
        setTimeout(listenSSEEvents, 3000)
      }
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        iceCastData.value = parsedData.icecast
        airTimeData.value = parsedData.airtime
      }

      isListeningEvents.value = true
    }
  }

  watch(
    airTimeData,
    () => {
      updateQuery()
    },
    { deep: true },
  )

  watch(
    liveQuery,
    () => {
      fetchMetadata()
    },
    { deep: true },
  )

  onNuxtReady(() => {
    listenSSEEvents()
    listenSSEProgress()
    listenSSEListeners()
  })

  return {
    metadata,
    isListeningEvents,
    liveQuery,
    progress,
    listeners,
    isMixtape,
    fetch,
  }
})

export const useMetadataStoreRefs = () => storeToRefs(useMetadataStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useMetadataStore, import.meta.hot))
}
