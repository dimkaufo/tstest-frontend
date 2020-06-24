const path = require("path");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SOURCE_DIR = path.resolve(__dirname, "src");
const APP_DIR = path.resolve(__dirname, "src/app");
const ASSETS_DIR = path.resolve(__dirname, "src/assets");

module.exports = (env, {mode}) => ({
    cache: true,
    context: SOURCE_DIR,
    entry: SOURCE_DIR + "/index.tsx",
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: "index.js",
        chunkFilename: "[name].js"
    },
    resolve: {
        modules: [
            path.resolve("./src/app"),
            "node_modules"
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "app-assets": path.resolve("./src/assets"),
            "app-types": path.resolve("./src/types"),
        }
    },
    devtool: mode === "development" ? "cheap-module-eval-source-map" : false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: SOURCE_DIR,
                exclude: ASSETS_DIR,
                use: [
                    { loader: "cache-loader" },
                    {
                        loader: "thread-loader",
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require("os").cpus().length - 1,
                            poolTimeout: process.env.NODE_ENV === "development"
                                ? Infinity
                                : 3000 // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                            happyPackMode: true,
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true
                        }
                    }
                ],
            },
            {
                test: /\.svg$/,
                include: ASSETS_DIR + "/svg",
                use: [
                    {
                        loader: 'svg-react-loader'
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {cleanupAttrs: true},
                                {removeTitle: true},
                                {removeComments: true},
                                {removeMetadata: true},
                                {removeDesc: true},
                                {removeUselessDefs: true},
                                {convertColors: {shorthex: false}},
                                {convertPathData: false}
                            ]
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Bryxen test task",
            template: "./index.tmpl",
            filename: "index.html"
        }),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: {
                configFile: path.resolve(__dirname, "tsconfig.json")
            }
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    devServer: {
        historyApiFallback: true
    }
});

