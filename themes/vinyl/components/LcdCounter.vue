<script lang="ts" setup>
  import { HeadphonesIcon } from 'lucide-vue-next'

  const props = defineProps<{
    count: number
  }>()

  const lcdDigitNumber = 3
  const numberCount = computed(() => props.count.toString().length)
  const emptyZeros = computed(() => lcdDigitNumber - numberCount.value)
  const otherCount = computed(() => props.count - 1)
</script>

<template>
  <Card
    v-if="count"
    class="md:portrait::-right-8 absolute bottom-16 right-10 cursor-default rounded-2xl border-2 border-muted/20 bg-transparent sm:portrait:-bottom-6 sm:portrait:right-44 md:portrait:-bottom-8 sm:landscape:-right-20 sm:landscape:bottom-36 md:landscape:bottom-28 md:landscape:right-3 lg:landscape:-right-10"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div class="m-0 rounded-xl bg-background px-3 py-2">
            <div class="flex items-center gap-3">
              <HeadphonesIcon class="text-primary/30" />
              <div class="rounded-md bg-muted px-2 py-0">
                <div class="font-lcd text-xl tracking-wider">
                  <span v-for="i in emptyZeros" :key="i" class="text-foreground/20">0</span>
                  <span class="text-primary">{{ count }}</span>
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent arrow>
          Vous partagez l'écoute de Nina.fm avec {{ `${otherCount} autre${otherCount > 1 ? 's' : ''}` }} !
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </Card>
</template>

<style></style>
