import { defineStore } from "pinia"

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

interface FetchData {
  metadata: Obj | null
  liveInfo: Info | null
  flux: Obj | null
  liveQuery: Query | null
}

export const useMetadataStore = defineStore("metadata", () => {
  const config = useRuntimeConfig()
  const refreshDelay = config.public.streamRefreshTime
  const metadata = ref<Obj | null>(null)
  const liveQuery = ref<Query | null>(null)
  const progress = ref<number>(0)
  const listeners = ref<number>(0)
  const intervalId = ref<NodeJS.Timer | null>(null)
  const isMixtape = computed(() => !!metadata.value)

  const fetch = async () => {
    const fetchLiveInfo: FetchData = await $fetch(`${config.public.apiUrl}${config.public.apiMetadataEndpoint}`)

    if (fetchLiveInfo) {
      metadata.value = fetchLiveInfo.metadata
      listeners.value = fetchLiveInfo?.flux ? (fetchLiveInfo.flux.listeners as number) : 0

      if (fetchLiveInfo?.liveInfo) {
        const response = fetchLiveInfo.liveInfo
        // Infos
        const [authors, name] = response?.current?.name.split(" - ")
        const query = { authors, name }
        liveQuery.value = query
        // Durations
        const schedulerTime = parseAirTimeDate(response?.schedulerTime)
        const currentStarts = parseAirTimeDate(response.current.starts)
        const currentEnds = parseAirTimeDate(response.current.ends)
        const timezoneOffset = Number(response.timezoneOffset)
        const timeElapsed = schedulerTime.diff(currentStarts, "milliseconds").milliseconds - timezoneOffset * 1000
        const trackLength = currentEnds.diff(currentStarts, "milliseconds").milliseconds
        progress.value = (timeElapsed * 100) / trackLength
      } else {
        liveQuery.value = {}
        progress.value = 0
      }
    }
  }

  onNuxtReady(() => {
    fetch()
    intervalId.value = setInterval(() => fetch(), refreshDelay)
  })

  return {
    metadata,
    liveQuery,
    progress,
    listeners,
    isMixtape,
    fetch,
  }
})

export const useMetadataStoreRefs = () => storeToRefs(useMetadataStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMetadataStore, import.meta.hot))
}
