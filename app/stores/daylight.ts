import { getHours } from 'date-fns'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { DAYLIGHT_POLL_INTERVAL, isDayTime } from '~/lib/theme/daylight'

enum DaylightMode {
  DAY = 'day',
  NIGHT = 'night',
}

export const useDaylightStore = defineStore('daylight', () => {
  const daylight = ref<DaylightMode>()
  const intervalId = ref<NodeJS.Timer | null>(null)
  // Initialiser avec une valeur basée sur l'heure UTC pour éviter le flash côté SSR
  const currentHour = getHours(new Date())
  const isDay = ref<boolean>(isDayTime(currentHour))
  const isNight = computed(() => !isDay.value)

  const updateDaylight = () => {
    const currentHour = getHours(new Date())
    isDay.value = isDayTime(currentHour)
    daylight.value = isDay.value ? DaylightMode.DAY : DaylightMode.NIGHT
  }

  onNuxtReady(() => {
    updateDaylight()
    intervalId.value = setInterval(() => updateDaylight(), DAYLIGHT_POLL_INTERVAL)
  })

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
