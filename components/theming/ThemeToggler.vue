<script lang="ts" setup>
import type { AcceptableValue } from "reka-ui";
import { Fragment } from "vue/jsx-runtime";

const { current } = useThemeStoreRefs();
const { publicThemes, switchTheme } = useThemeStore();

const handleChange = (payload: AcceptableValue | AcceptableValue[]) => {
  const theme = Array.isArray(payload) ? payload[0] : payload;
  if (typeof theme === "string") {
    switchTheme(theme as ThemeKey);
  }
};
</script>

<template>
  <div v-if="publicThemes.length" :class="cn('z-50 absolute top-1/2 -translate-y-1/2 right-8', $attrs.class)">
    <Toggler direction="vertical" v-model:model-value="current" @update:model-value="handleChange">
      <TogglerItem v-for="theme in publicThemes" :key="theme.key" :value="theme.key" class="rounded-full">
        <NinaIcon v-if="!!theme?.icon" :icon="theme.icon" />
        <Fragment v-else>{{ theme.name }}</Fragment>
      </TogglerItem>
    </Toggler>
  </div>
</template>
