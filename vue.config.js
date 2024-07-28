const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: './dist/HYCOM/r3.0/',
  pwa: {
    name: 'HYCOM3.0',
    themeColor: '#4169E1',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
    }
  },
  configureWebpack: config => {
    config.plugins.push(
      new GenerateSW({
        cacheId: 'hycom3.0-v2',
        skipWaiting: false,
        clientsClaim: false
      })
    )
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess(config) {
        config.plugins.delete('workbox')
        config.plugins.delete('pwa')
      },
      builderOptions: {
        appId: 'com.github.hycom3',
        directories: {
          output: './dist_electron'
        },
        afterSign: './build/notarize.js',
        win: {
          icon: './public/favicon.ico',
          target: 'nsis'
        },
        nsis: {
          'oneClick': false
        }
      }
    }
  }
}
