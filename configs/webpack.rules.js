module.exports = [
    {
        test: /native_modules\/.+\.node$/,
        use: "node-loader"
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: "@vercel/webpack-asset-relocator-loader",
            options: { outputAssetBase: "native_modules" }
        }
    },
    {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource"
    },
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    },
    {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|\.webpack)/,
        use: [{
            loader: "ts-loader",
            options: {
                transpileOnly: true
            }
        }]
    },
    {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
    }
];
