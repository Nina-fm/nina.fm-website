import { acceptHMRUpdate, defineStore } from "pinia"

import { decode } from "html-entities"

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

export const useMetadataStore = defineStore("metadata", () => {
  const config = useRuntimeConfig()
  const isListeningEvents = ref<boolean>(false)
  const isListeningProgress = ref<boolean>(false)
  const iceCastData = ref<Obj | null>(null)
  const airTimeData = ref<Info | null>(null)

  const metadata = ref<Obj | null>(null)
  const liveQuery = ref<Query | undefined>()
  const progress = ref<number>(0)
  const listeners = ref<number>(0)
  const isMixtape = computed(() => !!metadata.value)

  const fetchMetadata = async () => {
    const fetchData: Obj | null = await $fetch(`${config.public.apiUrl}${config.public.apiMetadataEndpoint}`, {
      query: liveQuery.value,
    })

    if (fetchData) {
      metadata.value = fetchData
    }
  }

  const updateListeners = () => {
    listeners.value = iceCastData.value ? (iceCastData.value.listeners as number) : 0
  }

  const updateQuery = () => {
    if (airTimeData.value) {
      const [authors, name] = decode(airTimeData.value?.current?.name).split(" - ")
      const query = { authors, name }
      liveQuery.value = query
    } else {
      liveQuery.value = undefined
    }
  }

  const listenServerProgress = () => {
    if (!isListeningProgress.value) {
      const events = new EventSource(`${config.public.streamSseUrl}/progress`)

      events.onerror = (event) => {
        console.log(event)
        setTimeout(listenServerProgress, 3000)
      }
      events.onmessage = (event) => {
        progress.value = JSON.parse(event.data)
      }

      isListeningProgress.value = true
    }
  }

  const listenServerEvents = () => {
    if (!isListeningEvents.value) {
      const events = new EventSource(`${config.public.streamSseUrl}/events`)

      events.onerror = (event) => {
        console.log(event)
        setTimeout(listenServerEvents, 3000)
      }
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        iceCastData.value = parsedData.iceCast
        airTimeData.value = parsedData.airTime
      }

      isListeningEvents.value = true
    }
  }

  watch(iceCastData, () => {
    updateListeners()
  })

  watch(airTimeData, () => {
    updateQuery()
  })

  watch(liveQuery, () => {
    fetchMetadata()
  })

  onNuxtReady(() => {
    listenServerEvents()
    listenServerProgress()
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
