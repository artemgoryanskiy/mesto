import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import {fileURLToPath} from 'url';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'scripts', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
    },
    devServer: {
        port: 8080,
        hot: true,
        open: true,
        compress: true,
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
                { from:
                        path.resolve(__dirname, 'src', 'images'),
                    to: path.resolve(__dirname, 'dist', 'images')},

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
                    filename: path.join('fonts', '[name].[ext]'),
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
};