const path = require("path");
const webpack = require("webpack");

module.exports = function (env) {
    const productionBuild = env === "production";
    const filename = `toastr-native${productionBuild ? ".min" : ""}.js`;
    const plugins = productionBuild ? [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
    ] : [];

    return {
        entry: "./src/toastr.ts",
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".js"],
        },
        output: {
            filename: filename,
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "umd",
        },
        module: {
            rules: [{
                    test: /\.ts$/,
                    exclude: /(node_modules)/,
                    use: ["ts-loader"],
                    enforce: "pre",
                },
                {
                    test: /\.ts$/,
                    enforce: "pre",
                    loader: "tslint-loader",
                    exclude: /(node_modules)/,
                    options: {
                        /* Loader options go here */
                    },
                }
            ],
        },
        plugins: plugins,
    };
};
