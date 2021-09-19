const path = require('path');

const defaults = {
  entry: path.resolve(__dirname, './src/adobexd.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: ['AdobeXD']
  },
  resolve: {
    fallback: {
      buffer: false
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 2
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

module.exports = [
  {
    ...defaults,
    output: {
      ...defaults.output,
      filename: 'bundle.js',
    },
    mode: 'development'
  },
  {
    ...defaults,
    output: {
      ...defaults.output,
      filename: 'bundle.min.js',
    },
    mode: 'production',
    devtool: 'source-map'
  },
  {
    ...defaults,
    output: {
      ...defaults.output,
      filename: 'main.js',
      libraryTarget: 'commonjs'
    },
    optimization: {
      minimize: false
    },
    mode: 'production',
  }
]
