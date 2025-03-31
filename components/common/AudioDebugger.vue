<script lang="ts" setup>
  import { BugIcon } from 'lucide-vue-next'

  const { debug, logs } = useDebugStoreRefs()
  const { clearLogs } = useDebugStore()
  const { refresh, stop } = useAudioStore()
  const bottomRef = useTemplateRef('bottomEl')
  const open = useCookie<boolean>('codemaster-debug-open', { watch: true })

  const scrollingArea = ref<HTMLDivElement | null>(null)

  watch(logs, () => {
    if (debug) scrollToBottom()
  })

  const handleUpdateOpen = (value: boolean) => {
    open.value = value
  }

  const scrollToBottom = () => {
    bottomRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<template>
  <ClientOnly>
    <Dialog v-if="debug" :modal="false" :open="open" @update:open="handleUpdateOpen">
      <DialogTrigger as-child>
        <ControlButton variant="outline" class="absolute right-5 top-20 z-50 rounded-full md:right-7">
          <BugIcon />
        </ControlButton>
      </DialogTrigger>
      <DialogContent
        class="left-10 max-h-[90dvh] w-full translate-x-0 grid-rows-[auto_minmax(0,1fr)_auto] bg-background/90 p-0 backdrop-blur sm:w-96"
        @interact-outside="(e) => e.preventDefault()"
      >
        <DialogHeader class="p-6 pb-0">
          <DialogTitle>Audio Debugger</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 overflow-y-auto px-6 pb-4">
          <div ref="scrollingArea" class="flex flex-col items-start justify-start gap-0">
            <pre
              v-for="log in logs"
              :key="log.timestamp"
              class="whitespace-nowrap text-sm before:mr-2 before:content-['▶︎']"
              v-html="log.message"
            ></pre>
            <div ref="bottomEl" class="h-0" />
          </div>
        </div>
        <DialogFooter class="p-6 pt-0">
          <Button variant="outline" size="sm" @click="stop">Fermer le flux</Button>
          <Button variant="outline" size="sm" @click="refresh">Relancer le flux</Button>
          <Button size="sm" @click="clearLogs">Effacer les logs</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </ClientOnly>
</template>

<style></style>
