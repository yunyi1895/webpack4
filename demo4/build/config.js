
module.exports = {
  dev: {
    mode: 'development',
    publicPath: '/',
    devServer: {
      port: '8899',
      proxy: {
        '/test/shortRent': {
          target: 'http:"//www.baidu.com',
          changeOrigin: true,
          pathRewrite: {
            '^/test/shortRent': '/evcard-evrental'
          }
        },
      },
    },
  },
  build: {
    mode: 'production',
    publicPath: './',
    assetsRoot: 'you-app'
  }

}