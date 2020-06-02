const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackPlugins = []

if (process.env.ANALYZE === true) {
  webpackPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  configureWebpack: {
    plugins: webpackPlugins,
  },
  pluginOptions: {},
  chainWebpack: config => {
    config.plugin('preload').tap(options => {
      options[0].as = entry => {
        if (/\.png$/.test(entry)) return 'image'
        if (/\.jpg$/.test(entry)) return 'image'
        if (/\.gif$/.test(entry)) return 'image'
        if (/\.svg$/.test(entry)) return 'image'
        return 'script'
      }
      options[0].include = 'allAssets'
      return options
    })
  },
  publicPath: '/',
  assetsDir: 'assets',
  pwa: {
    name: 'Learning Chinese',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#97266d',
    themeColor: '#e2e8f0',
    msTileColor: '#e2e8f0',
    iconPaths: {
      favicon32: 'assets/img/favicon-32x32.png',
      favicon16: 'assets/img/favicon-16x16.png',
      appleTouchIcon: 'assets/img/apple-touch-icon-152x152.png',
      maskIcon: 'assets/img/safari-pinned-tab.svg',
    },
    manifestOptions: {
      background_color: '#f7fafc',
      start_url: '/?mode=standalone', // ?mode=standalone
      icons: [
        { src: '/assets/img/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        {
          src: '/assets/img/pwa-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/assets/img/pwa-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },
  productionSourceMap: false,
}
