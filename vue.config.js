const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //中转服务器
  devServer:{
    proxy: {
      '/api': {
        target: 'http://localhost:8082',  // 目标代理服务器地址
        changeOrigin: true,                          // 允许跨域
        pathRewrite:{
          "^/api":''
        }
      },
      '/souhu': {
        target: 'http://pv.sohu.com/cityjson?ie=utf-8',
        changeOrigin: true,
        pathRewrite: {
          "^/souhu": ''
        }
      }
    }
  }
})
