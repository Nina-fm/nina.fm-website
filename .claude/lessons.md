# Leçons apprises — nina.fm-website

## SSR

### `import.meta.client` obligatoire pour toutes les APIs browser
Le SSR est activé sur le website. `window`, `document`, `navigator`, `EventSource`, `Audio`, `localStorage` n'existent pas côté serveur — les appeler sans guard fait crasher le rendu SSR. Toujours : `if (import.meta.client) { ... }` ou placer dans `onMounted`.

### `EventSource` (SSE) — fermeture obligatoire dans `onUnmounted`
Ne pas appeler `eventSource.close()` à la destruction du composant/store crée des fuites mémoire et des connexions SSE zombies. Le browser ne gère pas la reconnexion si la connexion précédente est toujours ouverte.
