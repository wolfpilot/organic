const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: `${__dirname}/src`,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: `${__dirname}/src`,
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    }
};
