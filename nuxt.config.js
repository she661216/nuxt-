const pkg = require('./package')
const metas = {
  title: "一品优选_一站式托管服务，只为你的满意。"
}

module.exports = {
  mode: 'universal',
  env: {
    YX_ENV: process.env.YX_ENV
  },
  srcDir: 'client/',
  buildDir: process.env.BUILD_DIR || '.nuxt',
  /*
  ** Headers of the page
  */
  head: {
    title: metas.title,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      // {httpEquiv: 'X-UA-Compatible', content: 'IE=edge, chrome=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    '@/assets/less/index.less'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/polyfill.js', ssr: false},
    {src: '~/plugins/vue-extend.js'},
    {src: '~/plugins/swiper.js', ssr: false},
    {src: '~/plugins/element-ui.js', ssr: true}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    // 'bootstrap-vue/nuxt'
    // '@nuxtjs/axios',
    // '@nuxtjs/proxy'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // styleResources: {
    //   less: './client/assets/less/variables/*.less'
    // },
    vendor: [
      'axios',
      'element-ui',
      'swiper'
    ],
    filenames: {
      app: ({isDev}) => isDev ? '[name].js' : '[name].[chunkhash].js',
      chunk: ({isDev}) => isDev ? '[name].js' : '[name].[chunkhash].js',
      css: ({isDev}) => isDev ? '[name].css' : '[name].[chunkhash].css',
      img: ({isDev}) => isDev ? '[path][name].[ext]' : 'img/[path][name][hash:7].[ext]',
      font: ({isDev}) => isDev ? '[path][name].[ext]' : 'fonts/[path][name][hash:7].[ext]',
      video: ({isDev}) => isDev ? '[path][name].[ext]' : 'videos/[path][name][hash:7].[ext]'
    },
    extractCSS: ({isDev}) => isDev ? false : true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // proxy: [
  // ['/backend/api', {
  //   target: `http://yxapi.dev.epweike.net`,
  //   secure: false,  // 如果是https接口，需要配置这个参数
  //   changeOrigin: true,  //是否跨域
  //   pathRewrite: {
  //     '^/backend/api': '/api'   //需要rewrite的,
  //   }
  // }]
  // ],
  router: {
    middleware: ['resetLoadingNum']
  }
}
