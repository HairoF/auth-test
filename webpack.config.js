const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelOptions = (preset) => {
    const opts = {
        presets: [
            '@babel/preset-env'   
        ]
    }

    if(preset) {
        opts.presets.push(preset)
    }
    return opts
}

const cssLoaders = extra => {
    const loaders = [{
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',

    ];
    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: ['@babel/polyfill', './index.jsx']
    },
    devServer: {
        hot: true,
        static:  './dist'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: '../public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'public/logo192.png'),
                    to: path.resolve(__dirname, 'dist')
                },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: cssLoaders(),
                sideEffects: true,
            },
            {
                test: /\.(sa|sc)ss$/,
                use: cssLoaders('sass-loader'),
                sideEffects: true,
                exclude: /\.module.(s(a|c)ss)$/
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader:'babel-loader',
                    options: babelOptions('@babel/preset-react')
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
}