'use strict'
const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const utils = require("./utils")

const FILE_PATH = path.resolve(__dirname, './pages')

function resolve(dir) {
    return path.join(__dirname, dir)
}


function getEntries() {
    var entryFiles = glob.sync(FILE_PATH + '/*/*/index.js')
    var entries = {},
        entry, dirname, basename;

    for (var i = 0; i < entryFiles.length; i++) {
        entry = entryFiles[i];
        dirname = path.dirname(entry);  // 获取到目录路径
        var arr = dirname.split("/");
        var len = arr.length;
        basename = arr[len - 2] + "/" + arr[len - 1];
        entries[basename] = entry;

        // 该部分的key为index.js的上两级的文件夹路径，用来命名打包后的js文件路径和名称
        // 所以，我希望你在使用时，在pages的文件夹中添加新的js文件时是以以下路径来添加
        // dir代表在assets/javascripts/文件夹下对应的文件夹名称
        // filename代表在assets/javascripts/dir内对应的js文件名称
        // 在ci.vueSrc中我希望你能这样添加js入口文件
        // pages/dir/filename/index.js
        // 这样会在打包后生成
        // assets/javascripts/dir/filename.js

        // console.log(dirname, basename);
    }

    return entries;
}

var entries = getEntries();

// 抽出打包的js部分,做为chunks
// const chunks = Object.keys(entries)

module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, utils.outputAsset),
        filename:  'javascripts/' + utils.EXPORT_PATH + '/[name].js',
    },
    externals: {
        // "Vue": "../../../assets/javascripts/vendor/vue/vue.min.js",
    },
    resolve: {
        // 自动解析确定的扩展
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'common': resolve("common"),
            'components': resolve("components"),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
                exclude: [resolve('node_modules')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: [resolve('node_modules')],
                options: {
                    loaders: utils.cssLoaders({
                        sourceMap: true,
                        extract: true
                    })
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                }
            },
        ].concat(utils.styleLoaders({
            sourceMap: true,
            extract: true,
            usePostCSS: true
        }))
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: true,
            parallel: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: 'stylesheets/' + utils.EXPORT_PATH + "/[name].css",
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: false,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true, map: {
                    inline: false
                }
            }
        }),
    ]
}
