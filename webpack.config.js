const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // tell CleanWebpackPlugin not remove index.html after build by watch
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            minify: true
        })
    ],

    devtool: 'source-map',
    // this requires installation of webpack-dev-server
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules:
        [
            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },

            // gltf
            {
                test: /\.(gltf|bin|glb)$/,
                type: 'asset/resource'
            }
        ]
    },
};