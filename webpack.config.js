const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {
    const productionBuild = env === 'production';
    const filename = `toastr-native${productionBuild ? '.min' : ''}.js`;
    const plugins = productionBuild
        ? [
              new webpack.optimize.ModuleConcatenationPlugin(),
              new webpack.optimize.UglifyJsPlugin({
                  sourceMap: true,
              }),
          ]
        : [];

    return {
        mode: 'development',
        entry: './src/toastr.ts',
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: filename,
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                silent: true,
                                ignoreDiagnostics: [2345, 2531, 2532],
                            },
                        },
                    ],
                    enforce: 'pre',
                },
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        /* Loader options go here */
                    },
                },
            ],
        },
        //plugins: plugins,
    };
};
