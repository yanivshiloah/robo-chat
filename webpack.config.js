const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
    ...isDevelopment && {devtool: 'cheap-module-source-map'},
    mode: isProduction ? 'production' : 'development',
    entry: isProduction ? './clients/index.js' :
        ['webpack-hot-middleware/client', 'react-hot-loader/patch', './client/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].[hash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: isProduction ? 'production' : 'development'
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/[name].[ext]'
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: ([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            inject: true
        }),
        isDevelopment && new webpack.HotModuleReplacementPlugin()
    ]).filter(Boolean)
};
