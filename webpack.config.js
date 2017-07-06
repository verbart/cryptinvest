const webpack = require('webpack');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: { presets: ['es2015'] },
      exclude: [/node_modules/]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT: JSON.stringify(isDevelopment)
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

if (!isDevelopment) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: true,
      compress: true,
      comments: false,
      drop_console: true,
      warnings: false,
      unsafe: true
    }),

    // function () {
    //   this.plugin('done', function(stats) {
    //     let manifest = {};
    //
    //     try {
    //       manifest = require(path.resolve(__dirname, 'public/rev-manifest.json'));
    //     } catch (error) {
    //       if (error.code !== 'MODULE_NOT_FOUND') {
    //         throw error;
    //       }
    //     }
    //
    //     stats = stats.toJson();
    //     const newName = stats.assetsByChunkName.main;
    //
    //     // manifest['bundle.js'] = newName;
    //
    //     console.log(manifest);
    //     console.log(newName);
    //
    //     require('fs').writeFileSync(
    //       path.resolve(__dirname, 'public/rev-manifest.json'),
    //       JSON.stringify(manifest)
    //     );
    //   });
    // }
  );
}
