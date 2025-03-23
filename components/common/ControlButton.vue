<script lang="ts" setup>
  import { InfoIcon } from 'lucide-vue-next'

  const props = defineProps<{
    icon?: string
    size?: number | string
    tooltip?: string
    iconClass?: string
  }>()

  const emit = defineEmits<{
    (e: 'click', event: Event): void
  }>()

  const attrs = useAttrs()
  const handleClick = (event: Event) => emit('click', event)

  const buttonClass = computed(() => cn('rounded-full hover:bg-background/40', [attrs.class]))
</script>

<template>
  <TooltipProvider v-if="!!props.tooltip">
    <Tooltip>
      <TooltipTrigger>
        <Button tabindex="-1" variant="ghost" size="icon" :class="buttonClass" @click="handleClick">
          <slot>
            <NinaIcon v-if="props.icon" :icon="props.icon" :size="props.size" :class="iconClass" />
            <InfoIcon v-else />
          </slot>
        </Button>
      </TooltipTrigger>
      <TooltipContent arrow>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="props.tooltip" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button v-else tabindex="-1" variant="ghost" size="icon" :class="buttonClass" @click="handleClick">
    <slot>
      <NinaIcon v-if="props.icon" :icon="props.icon" :size="props.size" :class="iconClass" />
      <InfoIcon v-else />
    </slot>
  </Button>
</template>
