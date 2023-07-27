import { acceptHMRUpdate, defineStore } from "pinia"

import { DateTime } from "luxon"

enum DaylightMode {
  DAY = "day",
  NIGHT = "night",
}

export const useDaylightStore = defineStore("daylight", () => {
  const daylight = ref<DaylightMode>()
  const intervalId = ref<NodeJS.Timer | null>(null)
  const isDay = ref<boolean>(true)
  const isNight = computed(() => !isDay.value)

  const updateDaylight = () => {
    const now = DateTime.now().toObject()
    const currentHour = now?.hour ?? 0
    isDay.value = currentHour > 7 && currentHour < 20
    daylight.value = isDay.value ? DaylightMode.DAY : DaylightMode.NIGHT
  }

  updateDaylight()
  intervalId.value = setInterval(() => updateDaylight(), 10000)

  return {
    daylight,
    isDay,
    isNight,
  }
})

export const useDaylightStoreRefs = () => storeToRefs(useDaylightStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useDaylightStore, import.meta.hot))
}
