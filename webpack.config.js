// webpack.config.js
var TransformModulesPlugin = require('webpack-transform-modules-plugin')
module.exports = {
    resolve: {
        alias: {
            'cube-ui': 'cube-ui/lib'
        }
    },
    plugins: [
        new TransformModulesPlugin()
    ]
}
