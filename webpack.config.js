var webpack = require('webpack');
var path = require('path');
console.log(
    path.join(__dirname, '/assets-new/js/react/', 'index.jsx'));
module.exports = {
    devtool: '#eval-source-map',

    entry: [
        'webpack/hot/dev-server?reload=true',
        'webpack-hot-middleware/client',
        path.join(__dirname, '/assets-new/js/react/', 'index.jsx')
    ],

    output: {
        path: path.join(__dirname, '/assets-new/js', 'dist'),
        publicPath: '/assets-new/js/dist/',
        filename: 'bundle.min.js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] }
        ]
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['.js', '.jsx']
    }
};
