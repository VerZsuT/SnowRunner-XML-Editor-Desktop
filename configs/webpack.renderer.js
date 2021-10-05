const rules = require('./webpack.rules');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: process.env.NODE_ENV === 'production'? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production'? false : 'source-map',
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules,
    },
};
