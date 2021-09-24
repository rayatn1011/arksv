module.exports = {
    //取消域名檢查
    devServer: {
      disableHostCheck: true
    },
    css: {
      sourceMap: true,
      loaderOptions: {
        scss: {
          additionalData: `@import "~@/assets/css/variables.scss";`
        }
      }
    }

  }