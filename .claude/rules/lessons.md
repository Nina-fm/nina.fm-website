---
description: Leçons apprises — nina.fm-website (chargé automatiquement)
---

# Lessons — nina.fm-website

## SSR
- SSR activé — toujours `if (import.meta.client)` pour `window`, `document`, `navigator`, `EventSource`, `Audio`, `localStorage`
- `EventSource` (SSE) : toujours `eventSource.close()` dans `onUnmounted`, sinon fuites mémoire et connexions zombies
