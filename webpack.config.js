const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
    entry: './src/main.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
        publicPath: '/react-map-weather/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devServer: {
        static: './public',
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NOMINATIM_URL': JSON.stringify(process.env.NOMINATIM_URL),
            'process.env.ORS_API_URL': JSON.stringify(process.env.ORS_API_URL),
            'process.env.OWM_API_URL': JSON.stringify(process.env.OWM_API_URL),
            'process.env.ORS_API_KEY': JSON.stringify(process.env.ORS_API_KEY),
            'process.env.OWM_API_KEY': JSON.stringify(process.env.OWM_API_KEY),
        })
    ],
};
