<script lang="ts" setup>
const props = defineProps<{
  count: number
}>()

const lcdDigitNumber = 3
const numberCount = computed(() => props.count.toString().length)
const emptyZeros = computed(() => lcdDigitNumber - numberCount.value)
</script>

<template>
  <Card
    v-if="count"
    class="absolute right-10 sm:landscape:-right-20 sm:portrait:right-44 md:landscape:right-3 md:portrait::-right-8 lg:landscape:-right-10 bottom-16 sm:landscape:bottom-36 sm:portrait:-bottom-6 md:landscape:bottom-28 md:portrait:-bottom-8 rounded-2xl bg-transparent border-2 border-muted/20"
  >
    <div class="rounded-xl m-0 px-3 py-2 bg-background">
      <div class="flex gap-3 items-center">
        <NinaIcon icon="headphones3" :size="24" class="text-primary/30" />
        <div class="bg-muted rounded-md px-2 py-0">
          <div class="font-lcd tracking-wider text-xl">
            <span v-for="i in emptyZeros" :key="i" class="text-foreground/20">0</span>
            <span class="text-primary">{{ count }}</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style></style>
