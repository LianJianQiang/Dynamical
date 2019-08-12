
// const plugins = [];
// if (['production', 'prod'].includes(process.env.NODE_ENV)) {
//     plugins.push("transform-remove-console")
// }

module.exports = {
    presets: [
        ['@vue/app', {
            "useBuiltIns": "entry",
            polyfills: [
                'es6.promise',
                'es6.symbol'
            ]
        }]
    ],
    plugins: [
        "transform-remove-console",         // 删除后ie白屏
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        'equire'
    ]
}
