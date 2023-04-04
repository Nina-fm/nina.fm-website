import svgLoader from "vite-svg-loader"
import vuetify from "vite-plugin-vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // head
    head: {
      title: `Nina.fm - H24 Musical - Ø Pub`,
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Webradio artisanale et associative, nina.fm diffuse des pépites musicales en continu, sans publicité, jusqu'aux confins du cosmos. Faîtes une pause, écoutez!",
        },
        {
          hid: "fb:app_id",
          name: "fb:app_id",
          content: "1290268801073013",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Nina.fm - H24 Musical - Ø Pub",
        },
        {
          hid: "og:description",
          name: "og:description",
          content:
            "Webradio artisanale et associative, nina.fm diffuse des pépites musicales en continu, sans publicité, jusqu'aux confins du cosmos. Faîtes une pause, écoutez!",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "/preview.png",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
      script: [
        {
          children: `var sc_project = 11548035
        var sc_invisible = 1
        var sc_security = "d39f401e"
        var scJsHost = "https:" == document.location.protocol ? "https://secure." : "http://www."
        document.write(
          "<sc" + "ript type='text/javascript' src='" + scJsHost + "statcounter.com/counter/counter.js'></" + "script>"
        )`,
        },
      ],
      noscript: [
        {
          children: `<div class="statcounter">
          <a title="web stats" href="http://statcounter.com/" target="_blank">
            <img class="statcounter" src="//c.statcounter.com/11548035/0/d39f401e/1/" alt="web stats">
          </a>
        </div>`,
        },
      ],
    },
  },

  runtimeConfig: {
    env: process.env.NODE_ENV,
    public: {
      sitename: "Nina.fm",
      streamUrl: process.env.NUXT_PUBLIC_STREAM_URL,
      streamRefreshTime: parseInt(process.env.NUXT_PUBLIC_STREAM_REFRESH_TIME ?? "1000", 10),
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiMetadataEndpoint: process.env.NUXT_PUBLIC_API_METADATA_ENDPOINT,
    },
  },

  devServerHandlers: [],

  typescript: {
    strict: true,
    shim: false,
  },

  css: ["@mdi/font/css/materialdesignicons.min.css", "assets/scss/main.scss"],

  // plugins: [{ src: "~/plugins/vuekonva", mode: "client" }],

  build: {
    transpile: [
      // "konva",
      "vuetify",
    ],
  },

  vite: {
    server: {
      hmr: {
        port: 3009,
      },
    },
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
    define: {
      "process.env.DEBUG": false,
    },
    plugins: [
      svgLoader(), // https://github.com/jpkleemans/vite-svg-loader#readme
    ],
  },

  // build modules
  modules: [
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs", "acceptHMRUpdate"],
      },
    ],
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.plugins.push(vuetify())
      )
    },
    "@vite-pwa/nuxt",
  ],

  pwa: {
    manifest: {
      name: `Nina.fm`,
      short_name: `Nina.fm`,
      description: `Nina.fm - Webradio artisanale — H24 Musical - Ø Pub`,
      icons: [
        {
          src: "/icon-small.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "/icon-small.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/icon-small.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "/icon-small.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/icon-small.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "/icon-small.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-small.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "/icon-small.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },

  imports: {
    dirs: ["stores", "themes/**/stores/*.{ts,js,mjs,mts}"],
  },

  // auto import components
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },
})
