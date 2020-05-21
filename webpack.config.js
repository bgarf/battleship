var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname , 'public'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.(js)$/, 
                use:'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      localsConvention: 'camelCase',
                      sourceMap: true
                    }
                  }
                ]
            },
            {
              test: /\.(png|jpeg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                },
              ],
            },
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ]

}
