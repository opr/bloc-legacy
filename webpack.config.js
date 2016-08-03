var webpack = require('webpack');
var path = require('path');
console.log(
    path.join(__dirname, '/assets/js/react/', 'index.jsx'));
module.exports = {
    debug: true,
    devtool: '#eval-source-map',

    entry: [
        'webpack/hot/dev-server?reload=true',
        'webpack-hot-middleware/client',
        path.join(__dirname, '/assets/js/react/', 'index.jsx')
    ],

    output: {
        path: path.join(__dirname, '/assets/js', 'dist'),
        publicPath: '/assets/js/dist/',
        filename: 'bundle.min.js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] }
        ]
    }
};