class Rules {
  get = () => [
    {
      test: /native_modules\/.+\.node$/,
      use: 'node-loader'
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
      type: 'asset/resource'
    },
    {
      test: /\.tsx?$/,
      exclude: /(node_modules|\.webpack)/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }]
    },
    {
      test: /\.s[ca]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
  ]
}

module.exports = new Rules().get()
