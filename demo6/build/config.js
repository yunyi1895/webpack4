
module.exports={
  dev:{
    mode:'development',
    publicPath:'/',
    port:'5567',
    assetsSubDirectory:'static',
    proxy:{
      '/test/shortRent': {
        target: 'http:"//www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
            '^/test/shortRent': '/evcard-evrental'
        }
      },
    },

  },
  build:{
    mode:'production',
    assetsSubDirectory:'static',
    publicPath:'./',
    assetsRoot:'you-app'
  }

}