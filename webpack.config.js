const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env) {
    let production = !env || env.NODE_ENV === 'production';
    const config1 = {
        mode: production ? 'production' : 'development',
        entry: ['./src/index.jsx', './src/style.scss'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: 'dist',
            overlay: true
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: 'babel-loader',
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        publicPath: 'images',
                        outputPath: 'images',
                    },
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                }
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            })
        ],
    };
    const config2 = {
        mode: production ? 'production' : 'development',
        entry: ['./src/admin/scripts/script.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'admin/admin.js'
        },
        devServer: {
            contentBase: 'dist',
            overlay: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'admin/index.html',
                template: './src/admin/index.html',
            }),
        ],
    };
    const config3 = {
        mode: production ? 'production' : 'development',
        entry: ['./src/admin/server/login.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'admin/login.js'
        },
        devServer: {
            contentBase: 'dist',
            overlay: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'admin/login.html',
                template: './src/admin/login.html',
            }),
        ],
    };
    return [config1, config2, config3];
}