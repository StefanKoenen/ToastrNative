var webpack = require('webpack');
let webpackConfig = require('./webpack.config')();
// webpackConfig.module.rules.push({
//     test: /\.ts$/,
//     loader: 'istanbul-instrumenter-loader',
//     exclude: /\.spec\.ts$/
// });

// webpackConfig.plugins = [
//     new webpack.SourceMapDevToolPlugin({
//         filename: null, // if no value is provided the sourcemap is inlined
//         test: /\.(ts|js)($|\?)/i, // process .js and .ts files only
//     }),
// ];

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            //require('karma-coverage-istanbul-reporter'),
            require('karma-sourcemap-loader'),
            require('karma-webpack'),
        ],
        files: [
            {
                pattern: './src/**/*.spec.ts',
                watched: false,
            },
            './node_modules/animate.css/animate.min.css',
            './toastr.css',
        ],
        preprocessors: {
            './src/**/*.ts': ['webpack', 'sourcemap'],
        },
        mime: {
            'text/x-typescript': ['ts'],
        },
        webpack: {
            mode: 'development',
            devtool: 'inline-source-map',
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
        },
        // coverageIstanbulReporter: {
        //     reports: ['html', 'lcovonly', 'text-summary'],
        //     fixWebpackSourcePaths: true
        // },
        // remapIstanbulReporter: {
        //     reports: {
        //         html: 'coverage',
        //         lcovonly: './coverage/coverage.lcov',
        //         "text-summary": ''
        //     }
        // },
        reporters: ['progress' /*, 'coverage-istanbul'*/],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        browsers: ['ChromeDebugging'],
        customLaunchers: {
            ChromeDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9333'],
            },
        },
    });
};
