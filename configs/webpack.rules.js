module.exports = [
    {
        test: /native_modules\/.+\.node$/,
        use: 'node-loader'
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: '@vercel/webpack-asset-relocator-loader',
            options: { outputAssetBase: 'native_modules' }
        }
    },
    {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
            {
                loader: 'babel-loader',
                options: { cacheDirectory: true }
            },
            {
                loader: 'ts-loader',
                options: { transpileOnly: true }
            }
        ]
    },
    {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    }
];
