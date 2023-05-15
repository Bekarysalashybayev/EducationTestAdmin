import {i18n} from "./locales/i18n-nuxt-config";

export default {
  server: {
    // host: '0',
    port: 4001
  },
  head: {
    title: 'EducationTestAdmin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-chtml.js',
        async: true,
        crossorigin: 'anonymous',
      },
    ],
  },

  css: [
    '~/assets/css/default.css',
  ],

  styleResources: {
    scss: [
      '~assets/scss/mixins.scss',
      '~assets/scss/variables.scss',
      '~assets/scss/container.scss',
    ]
  },

  plugins: [
    { src: '~plugins/vs-pagination', mode: 'client' },
    {src: "~/plugins/vClickOutside", ssr: false},
    "@/plugins/axios.js",
  ],

  components: true,

  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
  ],

  moment: {
    defaultLocale: 'kk',
    locales: ['kk', 'ru'],
  },

  modules: [
    ['nuxt-i18n', i18n],
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  toast: {
    position: 'top-center',
    duration: 500,
    register: []
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access',
        },
        endpoints: {
          login: {url: '/user/login/', method: 'post'},
          logout: false,
          user: false
        }
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
    },
  },
  router: {
    middleware: ['auth']
  },
  axios: {
    baseURL: process.env.BASE_URL
  },
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-property-in-object', {loose: true}]],
    },
  }
}
