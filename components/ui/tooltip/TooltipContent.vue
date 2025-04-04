<script setup lang="ts">
  import {
    TooltipArrow,
    TooltipContent,
    type TooltipContentEmits,
    type TooltipContentProps,
    TooltipPortal,
    useForwardPropsEmits,
  } from 'reka-ui'
  import { computed, type HTMLAttributes } from 'vue'

  defineOptions({
    inheritAttrs: false,
  })

  const props = withDefaults(
    defineProps<TooltipContentProps & { class?: HTMLAttributes['class']; arrow?: boolean }>(),
    {
      sideOffset: 4,
      arrow: false,
      class: '',
    },
  )

  const emits = defineEmits<TooltipContentEmits>()

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
  })

  const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
      <TooltipArrow v-if="props.arrow" class="fill-popover" />
    </TooltipContent>
  </TooltipPortal>
</template>
