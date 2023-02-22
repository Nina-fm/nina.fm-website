import { DateTime } from "luxon"
import { defineStore } from "pinia"

interface Query {
  authors?: string
  name?: string
}

interface Info {
  current: {
    name: string
    [key: string]: any
  }
  [key: string]: any
}

interface FetchData {
  metadata: Record<string, any> | null
  liveInfo: Info | null
  liveQuery: Query | null
}
interface Data {
  metadata: Record<string, any> | null
  liveQuery: Query | null
}

export const useMetadataStore = defineStore("metadata", () => {
  const config = useRuntimeConfig()
  const metadata = ref<Record<string, any> | null>(null)
  const liveQuery = ref<Query | null>(null)
  const progress = ref<number | null>(null)
  const intervalId = ref<NodeJS.Timer | null>(null)

  const fetch = async () => {
    const fetchLiveInfo: FetchData = await $fetch(`${config.public.apiUrl}/metadata-live`)

    if (fetchLiveInfo) {
      if (fetchLiveInfo?.metadata) {
        metadata.value = fetchLiveInfo.metadata
      }
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
      }
    }
  }

  onNuxtReady(() => {
    fetch()
    intervalId.value = setInterval(() => fetch(), 10000)
  })

  return {
    metadata,
    liveQuery,
    progress,
    fetch,
  }
})

export const useMetadataStoreRefs = () => storeToRefs(useMetadataStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMetadataStore, import.meta.hot))
}
