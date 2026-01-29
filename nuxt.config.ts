import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vite-pwa/nuxt',
    [
      '@vueuse/nuxt',
      {
        ssrHandlers: true,
      },
    ],
    '@nuxtjs/device',
  ],
  components: [
    // UI components are handled by shadcn-nuxt auto-import
    // Other components
    {
      path: '@/components',
      pathPrefix: false,
    },
    {
      path: '@/themes/peak/components/',
      prefix: 'Peak',
    },
    {
      path: '@/themes/vinyl/components/',
      prefix: 'Vinyl',
    },
  ],
  pinia: {
    storesDirs: ['./stores/**', './themes/**/stores/**'],
  },
  css: ['@/assets/css/tailwind.css'],
  runtimeConfig: {
    env: process.env.NODE_ENV,
    public: {
      sitename: 'Nina.fm',
      siteTitle: 'Nina.fm - H24 Musical - Ø Pub',
      audioStreamUrl: process.env.NUXT_PUBLIC_AUDIO_STREAM_URL,
      streamCheckNetworkTimeout: 10000,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiStreamEndpoint: process.env.NUXT_PUBLIC_API_STREAM_ENDPOINT,
    },
  },
  devServer: {
    port: Number(process.env.FRONT_OUTPUT_PORT) || 3000,
  },
  vite: {
    plugins: [svgLoader()],
  },
  eslint: {},
  typescript: {
    strict: true,
    shim: false,
  },
  app: {
    // head
    head: {
      title: `Nina.fm - H24 Musical - Ø Pub`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Webradio artisanale et associative, nina.fm diffuse des pépites musicales en continu, sans publicité, jusqu’aux confins du cosmos. Faîtes une pause, écoutez!',
        },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        {
          name: 'fb:app_id',
          content: '1290268801073013',
        },
        {
          name: 'og:title',
          content: 'Nina.fm - H24 Musical - Ø Pub',
        },
        {
          name: 'og:description',
          content:
            'Webradio artisanale et associative, nina.fm diffuse des pépites musicales en continu, sans publicité, jusqu’aux confins du cosmos. Faîtes une pause, écoutez!',
        },
        {
          name: 'og:image',
          content: '/preview.png',
        },
        {
          name: 'og:type',
          content: 'website',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
      script: [
        {
          type: 'text/javascript',
          tagPosition: 'bodyClose',
          innerHTML: `
            var sc_project = 11548035
            var sc_invisible = 1
            var sc_security = "d39f401e"
            var scJsHost = "https:" == document.location.protocol ? "https://secure." : "http://www."
            document.write(
              "<sc" + "ript type='text/javascript' src='" + scJsHost + "statcounter.com/counter/counter.js' async></" + "script>"
            )`,
        },
      ],
    },
  },
  pwa: {
    disable: true, // Désactivé - problèmes persistants avec browser store init
    registerWebManifestInRouteRules: true,
    manifest: {
      name: `Nina.fm`,
      short_name: `Nina.fm`,
      description: `Nina.fm - Webradio artisanale — H24 Musical - Ø Pub`,
      theme_color: '#222222',
      background_color: '#FFFFFF',
      icons: [
        {
          src: '/maskable_icon_x48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/maskable_icon_x72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/maskable_icon_x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/maskable_icon_x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/maskable_icon_x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/maskable_icon_x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable any',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
      // Stratégie réseau pour les assets critiques
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.nina\.fm\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 300, // 5 minutes
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: false, // Désactivé en dev pour éviter les conflits
      type: 'module',
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
})
