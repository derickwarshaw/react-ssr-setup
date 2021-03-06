// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelLoader = {
    test: /\.(js|jsx)$/,
    // exclude: /node_modules/,
    loader: 'babel-loader',
};

// Disabled until webpack watchmode bug gets fixed
// see: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/23
// const cssLoaderClient = {
//     test: /\.css$/,
//     use: [
//         MiniCssExtractPlugin.loader,
//         {
//             loader: 'css-loader',
//             options: {
//                 camelCase: true,
//                 importLoaders: 1,
//                 modules: true,
//                 localIdentName: '[name]__[local]--[hash:base64:5]',
//             },
//         },
//         'postcss-loader?sourceMap',
//     ],
// };

const cssLoaderClient = {
    test: /\.css$/,
    use: ['css-hot-loader'].concat(
        ExtractTextPlugin.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        camelCase: true,
                        modules: true,
                        importLoaders: 1,
                        sourceMap: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        })
    ),
};

const cssLoaderServer = {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'css-loader/locals',
            options: {
                camelCase: true,
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        },
        'postcss-loader?sourceMap',
    ],
};

const urlLoaderClient = {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 2048,
        name: 'assets/[name].[hash:8].[ext]',
    },
};

const urlLoaderServer = {
    ...urlLoaderClient,
    options: {
        ...urlLoaderClient.options,
        emitFile: false,
    },
};

const fileLoaderClient = {
    exclude: [/\.(js|css|mjs|html|json)$/],
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'assets/[name].[hash:8].[ext]',
            },
        },
    ],
};

const fileLoaderServer = {
    exclude: [/\.(js|css|mjs|html|json)$/],
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'assets/[name].[hash:8].[ext]',
                emitFile: false,
            },
        },
    ],
};

const client = [{ oneOf: [babelLoader, cssLoaderClient, urlLoaderClient, fileLoaderClient] }];
const server = [{ oneOf: [babelLoader, cssLoaderServer, urlLoaderServer, fileLoaderServer] }];

module.exports = {
    client,
    server,
};
