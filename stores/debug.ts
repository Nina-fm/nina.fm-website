import { defineStore } from 'pinia'

interface Log {
  timestamp: number
  message: string
}

export const useDebugStore = defineStore('debug', () => {
  const debug = useCookie<boolean>('codemaster-debug', { readonly: true, watch: true })

  const logs = ref<Log[]>([])

  const pushLog = (msg: string) => {
    logs.value = [...(logs.value ?? []), { timestamp: Date.now(), message: msg }]
  }

  const clearLogs = () => {
    log('clearLogs')
    logs.value = []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const log = (...params: any[]) => {
    if (debug) {
      pushLog(
        params
          .map((param) =>
            typeof param === 'object' ? `<pre class="text-2xs">${JSON.stringify(param, null, 4)}</pre>` : param,
          )
          .join(' '),
      )
      console.log(...params)
    }
  }

  return {
    clearLogs,
    debug,
    log,
    logs,
  }
})

export const useDebugStoreRefs = () => storeToRefs(useDebugStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useDebugStore, import.meta.hot))
}
