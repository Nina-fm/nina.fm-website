---
"nina.fm-website": patch
---

Corrections diverses sur les toasts et l'initialisation du player

- **fix(audio)** : les toasts de connexion ("Reconnexion en cours...", "Connexion perdue...", "Réseau rétabli...") n'apparaissent plus au chargement quand le navigateur bloque l'autoplay — ils sont supprimés tant que l'utilisateur n'a pas cliqué pour lancer la radio
- **fix(sonner)** : correction d'une 404 sur `vue-sonner/style.css` en dev — le CSS est maintenant importé directement dans le composant `Sonner.vue` plutôt que via `nuxt.config.ts`
- **fix(fullscreen)** : suppression du `readonly()` sur le ref `isFullscreen` qui provoquait un Vue warn lors de l'hydratation SSR ("Set operation on key 'value' failed: target is readonly")
- **fix(debugger)** : remplacement de `v-html` par une interpolation texte dans `AudioDebugger.vue` (élimine le warning ESLint `vue/no-v-html`)
