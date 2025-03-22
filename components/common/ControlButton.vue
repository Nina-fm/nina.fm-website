<script lang="ts" setup>
  import { InfoIcon } from 'lucide-vue-next'

  const props = defineProps<{
    icon?: string
    size?: number | string
    tooltip?: string
    class?: string
  }>()

  const emit = defineEmits<{
    (e: 'click', event: Event): void
  }>()

  const handleClick = (event: Event) => emit('click', event)

  const buttonClass = computed(() => cn('cursor-pointer rounded-full hover:bg-background/40', props.class))
</script>

<template>
  <TooltipProvider v-if="!!props.tooltip">
    <Tooltip>
      <TooltipTrigger>
        <Button as-child variant="ghost" size="icon" :class="buttonClass" @click="handleClick">
          <slot>
            <NinaIcon v-if="props.icon" :icon="props.icon" :size="props.size" />
            <InfoIcon v-else />
          </slot>
        </Button>
      </TooltipTrigger>
      <TooltipContent arrow>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <slot><div v-html="props.tooltip" /></slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button v-else as-child variant="ghost" size="icon" :class="buttonClass" @click="handleClick">
    <slot>
      <NinaIcon v-if="props.icon" :icon="props.icon" :size="props.size" />
      <InfoIcon v-else />
    </slot>
  </Button>
</template>
