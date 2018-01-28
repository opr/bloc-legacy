const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname),
    entry: [
        './assets/js/react/index.jsx',
        './assets/js/modules/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'assets/js/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false,
            minimize: true
        })
    ],
    module: {
        loaders: [
            // Transform JavaScript files via Babel
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(tiny-slider)\/).*/,
                loader: 'babel-loader',
            }
        ],
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['.js', '.jsx']
    }
};