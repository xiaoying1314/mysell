const path = require('path') // 引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
module.exports = {
    publicPath: "./",
    // 输出文件目录
    outputDir: "dist",
    // 静态资源存放的文件夹(相对于ouputDir)
    assetsDir: "static",
    // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
    lintOnSave:false,
    css: {
      loaderOptions: {
          stylus: {
              'resolve url': true,
              'import': []
          }
      }
    },
    pluginOptions: {
      'cube-ui': {
          postCompile: true,
          theme: false
      }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('src', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('src/views'))
            .set('assets', resolve('src/assets'))
        // set第一个参数：设置的别名，第二个参数：设置的路径
    }
}
