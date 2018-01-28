var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname),
    entry: [
        './assets/js/react/index.jsx',
        './assets/js/modules/index.jsx',
    ],
    output: {
        path: path.join(__dirname, 'assets/js/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],

    externals: {
        THREE: "THREE"
    },

    module: {
        rules: [
            // Transform JavaScript files via Babel
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ],
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['.js', '.jsx']
    }
};
