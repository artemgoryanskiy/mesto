const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'scripts', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
    },
    devServer: {
        compress: true,
        port: 8080,
        open: true,
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from:
                        path.resolve(__dirname, 'src', 'images'),
                    to: path.resolve(__dirname, 'dist', 'images')
                },

            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
}