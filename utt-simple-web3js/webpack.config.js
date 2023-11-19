// webpack.config.js
const path = require( 'path' );
module.exports = {
    context: __dirname,
    entry: {
        index: './src/javascript/index.js',
        bootstrap: './src/javascript/bootstrap.js',
    },
    output: {
        path: path.resolve( __dirname, 'build/js' ),
        filename: '[name].js',
    },
    module: {
        rules: [
            // Allows webpack to bundle javascript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // Allows webpack to bundle stylesheets
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
};