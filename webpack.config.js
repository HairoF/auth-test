const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log(isProd);
const optimization = () => {
    const config = {
      splitChunks: {
        chunks: 'all'
      }
    }
    if (isProd) {
        config.minimizer = [
          new CssMinimizerPlugin(),
          new TerserWebpackPlugin()
        ]
      }
    
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelOptions = (preset) => {
    const opts = {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react"
        ],
        plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread"
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

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: '../public/index.html',
            minify: {
                collapseWhitespace: isProd
            }
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
    ]

    if(isProd) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: ['./index.tsx']
    },
    devServer: {
        hot: isDev,
        static:  './dist',
        port: 8081
    },
    devtool: isProd ? 'hidden-source-map' : 'source-map',
    optimization: optimization(),
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: plugins(),
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
                test: /\.tsx?$/,
                exclude: {
                    and: [/node_modules/], 
                    not: [
                      /mobx/,
                      /mobx-react-lite/
                    ]
                  },
                use: {
                    loader:'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                },
            }
        ]
    },

}