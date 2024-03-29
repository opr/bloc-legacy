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
        loaders: [
            // Transform JavaScript files via Babel
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
            // Uncomment this if you want to use your own version of React instead of the version
            // bundled with ReactJS.NET.
            //{ test: require.resolve('react'), loader: 'expose?React' }
        ],
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['', '.js', '.jsx']
    }
};
