const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (env) {
    const productionBuild = env === 'production';
    const filename = `toastr-native${productionBuild ? '.min' : ''}.js`;
    const filenameCss = `toastr-native${productionBuild ? '.min' : ''}.css`;

    const optimization = productionBuild ? {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
        ],
    } : {};
    return {
        mode: productionBuild ? 'production' : 'development',
        entry: ['./src/toastr.ts', './src/toastr.scss'],
        devtool: productionBuild ? 'source-map' : 'inline-source-map',
        optimization,
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: filename,
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
        },
        module: {
            rules: [{
                    test: /\.s[ac]ss$/i,
                    use: [{
                            loader: 'file-loader',
                            options: {
                                name: filenameCss
                            },
                        },
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.ts$/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            silent: true,
                            ignoreDiagnostics: [2345, 2531, 2532],
                        },
                    }, ],
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
