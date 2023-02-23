import svgLoader from "vite-svg-loader"
import vuetify from "vite-plugin-vuetify"

const sitename = "Nina.fm"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // head
    head: {
      title: `${sitename} - H24 Musical - Ø Pub`,
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "The Nina.fm Website",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
      script: [],
    },
  },

  runtimeConfig: {
    public: {
      sitename,
      streamUrl: process.env.NUXT_PUBLIC_STREAM_URL,
      streamApiUrl: process.env.NUXT_PUBLIC_STREAM_API_URL,
      streamApiUrlFallback: process.env.NUXT_PUBLIC_STREAM_API_URL_FALLBACK,
      streamMountPoint: process.env.NUXT_PUBLIC_STREAM_MOUNT_POINT,
      streamRefreshTime: process.env.NUXT_PUBLIC_STREAM_REFRESH_TIME,
      stramMetadataUrl: process.env.NUXT_PUBLIC_STREAM_METADATA_URL,
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
  ],

  imports: {
    dirs: ["stores"],
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
