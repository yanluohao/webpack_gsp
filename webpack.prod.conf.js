const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require("./utils");
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
    devtool: '#source-map',
    plugins: [
        // gzip压缩
        // new CompressionWebpackPlugin({
        //     asset: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: new RegExp(
        //             '\\.(' +
        //             utils.gzipSource.join('|') +
        //             ')$'
        //     ),
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
    ]
});

const spinner = ora('building for production...')
spinner.start()

rm(path.resolve(__dirname, utils.outputAsset + '/javascripts/' + utils.EXPORT_PATH), err => {
    if (err) throw err;
    rm(path.resolve(__dirname, utils.outputAsset + '/stylesheets/' + utils.EXPORT_PATH), error => {
        if (error) throw error;

        webpack(webpackConfig, (err, stats) => {
            spinner.stop()
            if (err) throw err
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false
            }) + '\n\n')

            if (stats.hasErrors()) {
                console.log(chalk.red('  Build failed with errors.\n'))
                process.exit(1)
            }

            console.log(chalk.cyan('  Build complete.\n'))
            console.log(chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                '  Opening index.html over file:// won\'t work.\n'
            ))
        })
    })
})


