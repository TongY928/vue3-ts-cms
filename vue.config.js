module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 直接配置 webpack 属性
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}
