const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');


const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: '#source-map',
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: '127.0.0.1',
        port: '1188',
        open: false,
        quiet: true, // necessary for FriendlyErrorsPlugin
    },
});

module.exports = devWebpackConfig;
