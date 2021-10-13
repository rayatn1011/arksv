module.exports = {
    //取消域名檢查
    devServer: {
      open: true,
      disableHostCheck: true,
      port: 80,
      https: false,
      public: 'http://itshuri.asuscomm.com/'
    },
    publicPath: '/',
    css: {
      sourceMap: true,
      loaderOptions: {
        scss: {
          additionalData: `@import "~@/assets/css/_variables.scss";`
        }
      }
    }

  }