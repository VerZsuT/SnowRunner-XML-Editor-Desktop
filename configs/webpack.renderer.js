const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const rules = require("./webpack.rules");
const alias = require("./webpack.aliases");

const mode = process.env.NODE_ENV || "development";
const devtool = process.env.NODE_ENV === "production" ? false : "inline-source-map";

module.exports = {
    mode,
    devtool,
    plugins: [ new ForkTsCheckerWebpackPlugin() ],
    module: { rules },
    resolve: {
        alias,
        extensions: [".js", ".ts", ".tsx", ".css", ".scss"]
    },
    output: { pathinfo: false },
    optimization: {
        sideEffects: true,
        splitChunks: { chunks: "all" },
    }
};
