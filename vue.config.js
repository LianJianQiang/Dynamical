const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                modules: true,
                camelCase: true,
                localIdentName: '[name]-[hash]',
                data: `@import "~styles/core/index.scss";`
            }
        }
    },
    chainWebpack: (config) => {
        config.entry('main').add('babel-polyfill'); // main是入口js文件

        config.resolve.alias
            .set('src', resolve('src'))
            .set('pages', resolve('src/pages'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('api', resolve('src/api'))
            .set('styles', resolve('src/styles'))
            .set('assets', resolve('src/assets'))
            .set('utils', resolve('src/utils'))
            .set('lib', resolve('src/lib'))
            .set('store', resolve('src/store'));
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}
