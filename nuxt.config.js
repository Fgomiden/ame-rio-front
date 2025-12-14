export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AME-RIO | Associação Médico Espírita do Rio de Janeiro',
    htmlAttrs: {
      lang: 'pt-br',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'AME-RIO | Associação Médico Espírita do Rio de Janeiro',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Associação Médico Espírita do Rio de Janeiro',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://res.cloudinary.com/ame-rio/image/upload/v1652634612/ame-rio-logo.png',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'http://www.ame-rio.org.br',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: 'http://www.ame-rio.org.br',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '@toast-ui/editor/dist/toastui-editor.css',
    '~/assets/css/toast-editor-custom.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-simplemde.js',
    '~/plugins/date-fns.js',
    '~/plugins/toast.js',
    '~/plugins/eventBus.js',
    { src: '~/plugins/toast-editor.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/General',
      '~/components/General/header',
      '~/components/pagina-inicial',
      '~/components/patrono',
      '~/components/quem-somos',
    ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/dotenv'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],

  publicRuntimeConfig: {
    baseURL: process.env.NUXT_ENV_BASE_URL || 'http://localhost:8080/api',
    axios: {
      baseURL: process.env.NUXT_ENV_BASE_URL || 'http://localhost:8080/api',
    },
  },

  axios: {
    baseURL: process.env.NUXT_ENV_BASE_URL || 'http://localhost:8080/api',
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    html: true,
    runtime: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
