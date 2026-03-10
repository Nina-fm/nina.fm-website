---
"nina.fm-website": minor
---

Refactoring architectural : extraction de la logique métier vers `app/lib/`

- **Migration Nuxt 4** (`srcDir: 'app'`) — structure de dossiers alignée sur Nuxt 4
- **lib/metadata** — `parseAirTimeDate`, `formatDjs`, `isInterlude`, `transformMixtapeToMetadata`
- **lib/theme** — `daylight`, `rainbowColors`, `cycling` (dark mode, thème suivant)
- **lib/browser** — `detectAutoplay`, `convertImageToBase64`
- **lib/mediasession** — `getArtwork` (MediaSession API, testable sans DOM)
- **lib/audio** — `AudioReconnectManager` (state machine de reconnexion)
- **lib/sse** — `SseClient<T>` (client SSE générique avec reconnexion automatique)
- **Vitest** — setup + 77 tests unitaires sur toutes les fonctions `lib/`

Le code `lib/` est agnostique au framework : aucune dépendance Vue/Nuxt/Pinia.
