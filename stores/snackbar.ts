import { defineStore, storeToRefs } from "pinia"

export interface Snackbar {
  duration?: number
  color?: string
  message: string
}

const defaultValues = {
  duration: 5000,
  color: "info",
}

export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbars = ref<Snackbar[]>([])

  const enqueueSnackbar = (snackbar: Snackbar) => {
    const values = {
      ...defaultValues,
      ...snackbar,
    }
    snackbars.value.push(values)
    setTimeout(() => snackbars.value.splice(0, 1), values.duration + 500)
  }

  const snackInfo = (message: string) => enqueueSnackbar({ color: "info", message })

  const snackSuccess = (message: string) => enqueueSnackbar({ color: "success", message })

  const snackWarning = (message: string) => enqueueSnackbar({ color: "warning", message })

  const snackError = (message: string) => enqueueSnackbar({ color: "error", message })

  const resetSnackbars = () => (snackbars.value = [])

  return {
    snackbars,
    enqueueSnackbar,
    snackInfo,
    snackSuccess,
    snackWarning,
    snackError,
    resetSnackbars,
  }
})

export const useSnackbarStoreRefs = () => storeToRefs(useSnackbarStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))
}
