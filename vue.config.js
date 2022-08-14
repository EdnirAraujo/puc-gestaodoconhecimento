const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://gestaodoconhecimento-9e1c5-default-rtdb.firebaseio.com'
  }
})
