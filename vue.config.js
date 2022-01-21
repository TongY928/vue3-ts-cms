module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        target: 'www.baidu.com',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
