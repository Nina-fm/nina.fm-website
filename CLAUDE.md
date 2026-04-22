# CLAUDE.md — nina.fm-website

Site public Nina.fm. Nuxt 4 + Vue 3 + SSR. Webradio SSE, interface Peak/Vinyl thémée, Pinia.

## Stores — vérifier avant d'en créer un nouveau

`useAppStore`, `useAudioStore` (stream/volume/play), `useBrowserStore`, `useDaylightStore`, `useMetadataStore` (SSE), `useThemeStore` (peak/vinyl)

## Conventions

- Pattern : Composant → `useXxxStore()` → `$fetch`/SSE
- Stores Pinia : setup syntax — `defineStore('id', () => {...})`
- `computed()` pour les getters dérivés — jamais recalculé inline
- Jamais muter le state depuis les composants — passer par les actions
- `defineProps<T>()` / `defineEmits<T>()` — jamais options API
- Jamais `v-if` et `v-for` sur le même élément — wrapper `<template>`
- Icônes : `import { Play } from 'lucide-vue-next'`

## Thèmes Peak / Vinyl

`themes/peak/components/` → préfixe `Peak`, `themes/vinyl/components/` → préfixe `Vinyl`. Mêmes props, rendu différent. Thème actif : `useThemeStore()`.

## SSR Safety

APIs browser toujours dans `import.meta.client` : `window`, `document`, `navigator`, `EventSource`, `Audio`, `localStorage`. SSE toujours côté client, avec `eventSource.close()` dans `onUnmounted`. Env vars : `useRuntimeConfig()` uniquement.
