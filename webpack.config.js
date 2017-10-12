var webpack = require('webpack');
var path = require('path');
console.log(
    path.join(__dirname, '/assets/js/react/', 'index.jsx'));
module.exports = {
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'babel-loader'] }
        ]
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['.js', '.jsx']
    }
};
