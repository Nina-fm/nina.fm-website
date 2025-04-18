import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vite-pwa/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
      },
    ],
    [
      '@vueuse/nuxt',
      {
        ssrHandlers: true,
      },
    ],
    '@nuxtjs/device',
  ],
  components: [
    {
      path: '@/components/',
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
  imports: {
    dirs: ['stores', 'themes/**/stores/*.{ts,js}'],
  },
  css: ['@/assets/css/tailwind.css'],
  runtimeConfig: {
    env: process.env.NODE_ENV,
    public: {
      sitename: 'Nina.fm',
      siteTitle: 'Nina.fm - H24 Musical - Ø Pub',
      streamUrl: process.env.NUXT_PUBLIC_STREAM_URL,
      streamSseUrl: process.env.NUXT_PUBLIC_STREAM_SSE_URL,
      streamCheckNetworkTimeout: 10000,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiMetadataEndpoint: process.env.NUXT_PUBLIC_API_METADATA_ENDPOINT,
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
    },
  },
  devServer: {
    port: 4000,
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
    },
    devOptions: {
      enabled: true,
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
