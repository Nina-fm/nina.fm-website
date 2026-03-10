# nina.fm-website

## 2.2.1

### Patch Changes

- e5c4c53: Corrections diverses sur les toasts et l'initialisation du player
  - **fix(audio)** : les toasts de connexion ("Reconnexion en cours...", "Connexion perdue...", "Réseau rétabli...") n'apparaissent plus au chargement quand le navigateur bloque l'autoplay — ils sont supprimés tant que l'utilisateur n'a pas cliqué pour lancer la radio
  - **fix(sonner)** : correction d'une 404 sur `vue-sonner/style.css` en dev — le CSS est maintenant importé directement dans le composant `Sonner.vue` plutôt que via `nuxt.config.ts`
  - **fix(fullscreen)** : suppression du `readonly()` sur le ref `isFullscreen` qui provoquait un Vue warn lors de l'hydratation SSR ("Set operation on key 'value' failed: target is readonly")
  - **fix(debugger)** : remplacement de `v-html` par une interpolation texte dans `AudioDebugger.vue` (élimine le warning ESLint `vue/no-v-html`)

## 2.2.0

### Minor Changes

- bf3ef1d: Refactoring architectural : extraction de la logique métier vers `app/lib/`
  - **Migration Nuxt 4** (`srcDir: 'app'`) — structure de dossiers alignée sur Nuxt 4
  - **lib/metadata** — `parseAirTimeDate`, `formatDjs`, `isInterlude`, `transformMixtapeToMetadata`
  - **lib/theme** — `daylight`, `rainbowColors`, `cycling` (dark mode, thème suivant)
  - **lib/browser** — `detectAutoplay`, `convertImageToBase64`
  - **lib/mediasession** — `getArtwork` (MediaSession API, testable sans DOM)
  - **lib/audio** — `AudioReconnectManager` (state machine de reconnexion)
  - **lib/sse** — `SseClient<T>` (client SSE générique avec reconnexion automatique)
  - **Vitest** — setup + 77 tests unitaires sur toutes les fonctions `lib/`

  Le code `lib/` est agnostique au framework : aucune dépendance Vue/Nuxt/Pinia.

## 2.1.10

### Patch Changes

- 21e9edc: Add label to skip diun checks

## 2.1.9

### Patch Changes

- 00b589a: Restore PWA with generateSW strategy and client-only browser initializer. Fixes Service Worker 503 errors and useScreenOrientation SSR crash by using a proper Vue component lifecycle instead of plugins.

## 2.1.8

### Patch Changes

- 6b76182: Fix SW

## 2.1.7

### Patch Changes

- b9e1bd1: fix: disable PWA to resolve service worker cache issues

## 2.1.6

### Patch Changes

- 1365259: fix(deploy): force remove container before deploy

## 2.1.5

### Patch Changes

- b7acbdd: Fix PWA SW rebuild after invalidation

## 2.1.4

### Patch Changes

- 6d14960: Fix PWA cache

## 2.1.3

### Patch Changes

- f2a9d42: Fix 500 on prod

## 2.1.2

### Patch Changes

- 97d41e8: Fix useScreenOrientation ssr

## 2.1.1

### Patch Changes

- 96d9283: Fix media session artwork

## 2.1.0

### Minor Changes

- a02ab70: Fix connectivity + media session artwork

## 2.0.3

### Patch Changes

- 56cc992: Fix: use the djs formatting logic

## 2.0.2

### Patch Changes

- b59ff7c: fix: track mode and vinyl theme

## 2.0.1

### Patch Changes

- e6f3f8d: Fix dark mode initialisation

## 2.0.0

### Major Changes

- 37bbc31: New version connected to Nina API
