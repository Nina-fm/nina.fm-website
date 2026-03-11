---
"nina.fm-website": patch
---

fix: éliminer les re-renders en cascade au chargement

- `audioElement.ts` : corrige la fuite de listeners audio — `_removeEventListeners` utilisait des fonctions anonymes créées à chaque appel, empêchant le vrai nettoyage des événements sur les éléments `Audio` abandonnés
- `stores/audio.ts` : ajoute une période de grâce (2s) avant d'activer la détection de panne réseau, évitant la fausse alarme de reconnexion au démarrage (toast + AnimatedLoader en cascade)
- `stores/app.ts` : remplace `watch` par `watchEffect` pour `setBodyClasses`, et corrige `onScopeDispose` appelé dans un contexte async (warning Vue)
- `peakTheme.ts` / `vinylTheme.ts` : supprime les watchers circulaires en faveur d'actions atomiques qui mutent l'état et appellent `setClasses` en une seule opération
- `Audience.vue` : lazy-mount des composants `Tooltip` par étoile — au chargement, zéro Tooltip en mémoire ; ils se montent uniquement au premier survol
