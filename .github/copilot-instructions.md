# Instructions GitHub Copilot - Site Web Nina.fm

## Architecture Générale

**Type de projet :** Application web Nuxt 3 (Vue 3 + TypeScript) - Webradio artisanale et associative  
**Stack technique :** Nuxt 3, Vue 3, TypeScript, Tailwind CSS, Pinia, shadcn-nuxt, PWA

## Structure du Projet

### 1. Système de Thèmes Dynamiques

- Architecture multi-thèmes avec chargement dynamique
- Thèmes disponibles : `peak` (psychédélique) et `vinyl` (rétro)
- Chaque thème contient : composants, layouts, pages, stores, assets CSS spécifiques
- Système de bascule de thème avec cookie persistant
- Mode sombre configurable par thème avec option "auto" basée sur l'heure
- Mode "rainbow" avec couleurs et durées personnalisables par thème

### 2. Gestion Audio Streaming

- Lecteur audio HTML5 personnalisé avec composable `audioElement.ts`
- Streaming en direct depuis URL configurée via variables d'environnement
- Détection autoplay avec système de verrouillage
- Gestion reconnexion automatique en cas de problème réseau
- États : loading, playing, stopped, preloading, networkIssue
- Notifications toast via vue-sonner pour les états de connexion

### 3. Métadonnées en Temps Réel

- Système SSE (Server-Sent Events) pour 3 flux :
  - `/events` : données IceCast + AirTime (info piste courante)
  - `/progress` : progression de lecture
  - `/listeners` : nombre d'auditeurs
- Décodage HTML entities pour les titres
- Parsing automatique format "Artiste - Titre"
- Fetch API pour enrichir métadonnées mixtapes
- Types : Track, Author, Tag, Metadata

### 4. Architecture Stores Pinia

- **app.ts** : État global application
- **audio.ts** : Contrôle lecteur audio
- **browser.ts** : Détection capacités navigateur
- **daylight.ts** : Calcul jour/nuit pour mode sombre auto
- **debug.ts** : Logs debug conditionnels
- **loading.ts** : États chargement globaux
- **metadata.ts** : Gestion métadonnées temps réel
- **theme.ts** : Gestion thèmes et options visuelles
- Stores spécifiques par thème : `peakTheme.ts`, `vinylTheme.ts`

### 5. Composants UI

- Bibliothèque shadcn-nuxt : Alert, Avatar, Badge, Button, Card, Dialog, Drawer, HoverCard, Progress, Skeleton, Sonner, Toggler, Tooltip
- Composants métier :
  - **AudioControlOverlay** : Overlay contrôle lecture
  - **Controls** : Boutons play/pause, volume
  - **Notifier** : Système notifications toast
  - **Rainbow** : Effet visuel arc-en-ciel dynamique
  - **AnimatedLoader** : Indicateur chargement

### 6. Configuration & Environnement

Variables requises :

```
NUXT_PUBLIC_STREAM_URL - URL flux audio
NUXT_PUBLIC_STREAM_SSE_URL - URL serveur SSE
NUXT_PUBLIC_API_URL - URL API métadonnées
NUXT_PUBLIC_API_METADATA_ENDPOINT - Endpoint métadonnées
NUXT_PUBLIC_API_KEY - Clé API
FRONT_OUTPUT_PORT - Port dev (défaut 3000)
```

### 7. PWA & Optimisations

- Manifest PWA avec icônes maskable multiples tailles
- Service worker via @vite-pwa/nuxt
- Stratégie cache navigateFallback
- SEO : meta tags Open Graph, Facebook App ID
- Sitemap via @nuxtjs/sitemap
- Font loading : Airbnb Cereal, Avenir Next, Dot Digital 7

### 8. Conventions de Code

- **Scripts** : `dev`, `build`, `preview`, `lint`, `format`, `pm2:restart`
- **Formatage** : Prettier + eslint avec plugins organize-imports, tailwindcss
- **TypeScript strict** : `strict: true`, types globaux dans `types/*.d.ts`
- **Imports auto** : stores, composables, composants thèmes avec préfixes
- **CSS** : Tailwind + classes custom par thème, animations tailwindcss-animate

### 9. Déploiement

- Build mode cluster : `NITRO_PRESET=node_cluster`
- PM2 pour production : `ecosystem.config.cjs`
- Netlify : configuration dans `netlify.toml`
- Statcounter analytics intégré

### 10. Utilitaires Clés

- `cn()` : Fusion classes Tailwind
- `convertImageToBase64()` : Conversion images base64
- `detectAutoplay()` : Test capacité autoplay navigateur
- `isInterlude()` : Détection interludes dans tracklist
- `parseAirTimeDate()` : Parse dates AirTime
- `rainbowColors` : Palettes couleurs (basic, psychedelic, flashy)

## Règles de Développement

1. **TypeScript** : Toujours utiliser TypeScript strict
2. **Architecture thèmes** : Respecter l'isolation multi-thèmes (ne pas casser la séparation)
3. **Stores Pinia** : Utiliser le pattern `useXStore()` + `useXStoreRefs()`
4. **Composables** : Préférer les composables aux mixins
5. **Composants UI** : Garder les composants UI génériques dans `/components/ui`
6. **Composants thèmes** : Composants métier thème-spécifiques dans `/themes/{theme}/components`
7. **Audio** : Tester autoplay et reconnexion réseau pour tout changement audio
8. **PWA** : Maintenir compatibilité PWA (offline, manifest)
9. **Mobile** : Optimiser pour mobile (tactile, viewport, status bar)
10. **Performance** : Lazy loading pour les thèmes et composants lourds

## Patterns Importants

### Création d'un nouveau thème

```typescript
// themes/monTheme/index.ts
export const monTheme: Theme = {
  key: 'monTheme',
  name: 'Mon Thème',
  icon: 'icon-name',
  public: true,
  options: {
    darkMode: true,
    rainbow: {
      class: 'mix-blend-difference',
      colors: psychedelicColors,
      duration: 10000,
    },
  },
}
```

### Utilisation des stores

```typescript
// Composant
const { current, isDarkModeActive } = useThemeStoreRefs()
const { toggleTheme } = useThemeStore()

// Store
export const useMyStore = defineStore('myStore', () => {
  const state = ref(defaultValue)
  return { state }
})

export const useMyStoreRefs = () => storeToRefs(useMyStore())
```

### Composables audio

```typescript
const { playing, loading, toggleStartStop } = useAudioStoreRefs()
const { start, stop } = useAudioStore()
```

### Composants préfixés par thème

```vue
<!-- Utilisation dans un thème -->
<PeakMixTapeCard />
<!-- depuis themes/peak/components -->
<VinylDisk />
<!-- depuis themes/vinyl/components -->
```
