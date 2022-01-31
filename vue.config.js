module.exports = {
  //取消域名檢查
  devServer: {
    open: true,
    disableHostCheck: true,
    https: true,
    port: 443,
    host: '0.0.0.0',
    public: 'dev.itshuri.com/',
    proxy: {
      '/catAssets': {
        target: 'https://townofsakura.jw.com.tw',
        secure: false,
        changeOrigin: true,
      },
    },
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