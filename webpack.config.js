const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { srcPath, distPath } = require('./path')

module.exports = {
    mode: 'production',
    entry: 
    {
        index: path.join(srcPath, 'index.js'),
        ball: path.join(srcPath, 'js/ball.js'), 
        about:path.join(srcPath,'js/about.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(distPath,'js'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],  
                include: srcPath,         
                exclude: /node_modules/   
            },
            {
                test: /\.css$/,
                use: [{
                loader:MiniCssExtractPlugin.loader,
                options:{
                    publicPath: '../'  //回退到上一级
                }
                }, "css-loader"] ,
               
            },
            {
               test: /\.(png|jpg|jpeg|gif)$/,
               use: 
               {
                  loader: 'url-loader',
                  options:{
                  name: 'img/[name].[ext]',
                  esModule: false,
                  limit: 3000    
                  }
                }
            },
            {
                test: /\.(htm|html)$/,            
                loader: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),  
            filename: 'index.html' ,    
            chunks:['index']                 
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'about.html'),  
            filename: 'about.html' ,    
            chunks:['about']                 
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'about.html'),  
            filename: 'ball.html' ,    
            chunks:['ball']                 
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'  
          })
    ]
}
