<script lang="ts" setup>
  import type { ButtonVariants } from '~/components/ui/button'

  const props = withDefaults(
    defineProps<{
      variant?: ButtonVariants['variant']
      tooltip?: string
      iconClass?: string
    }>(),
    {
      variant: 'ghost',
      tooltip: undefined,
      iconClass: '',
    },
  )

  const emit = defineEmits<{
    (e: 'click', event: Event): void
  }>()

  const attrs = useAttrs()
  const handleClick = (event: Event) => emit('click', event)

  const buttonClass = computed(() =>
    cn('shadow-none rounded-full [&_svg]:size-4 hover:bg-background/40', [attrs.class]),
  )
</script>

<template>
  <TooltipProvider v-if="!!props.tooltip">
    <Tooltip>
      <TooltipTrigger>
        <Button tabindex="-1" :variant="props.variant" size="icon" :class="buttonClass" @click="handleClick">
          <slot></slot>
        </Button>
      </TooltipTrigger>
      <TooltipContent arrow>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="props.tooltip" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button v-else tabindex="-1" :variant="props.variant" size="icon" :class="buttonClass" @click="handleClick">
    <slot></slot>
  </Button>
</template>
