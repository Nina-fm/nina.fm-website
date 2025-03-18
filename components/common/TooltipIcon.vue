<script setup lang="ts">
const props = defineProps<{
  icon: string;
  size?: number | string;
  tooltip?: string;
}>();

const emit = defineEmits<{
  (e: "click", event: Event): void;
}>();

const handleClick = (event: Event) => {
  emit("click", event);
};
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div v-if="getCurrentInstance()?.vnode.props?.onClick" @click="handleClick" class="cursor-pointer">
          <NinaIcon :icon="props.icon" :size="props.size" :class="cn([$attrs.class])" />
        </div>
        <NinaIcon v-else :icon="props.icon" :size="props.size" :class="cn([$attrs.class])" />
      </TooltipTrigger>
      <TooltipContent>
        <slot><div v-html="props.tooltip" /></slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
