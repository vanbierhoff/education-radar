/* eslint-disable */
/**
 * path - отслеживает пути к файлам, относительного того, в каком ОС работаем. Чтобы при запускп в другой ОС не прописывать пути к файлам по новой
 */

const path = require('path');
const MiniCssPlugin = require('mini-css-extract-plugin');
const HTMLplugin = require('html-webpack-plugin');


/**
 * @param  path.resolver(__dirname) - узнает в какой конкретно папке и ОС мы находимся. Дальше можно указывать относительый путь к точке входа
 *
 * Описываем точку входа
 *
 * @param {{entry: {main: (__dirname|"name_directory", "namefile.js"}}} здесь мы описываем нашу точку вода
 *
 *
 *   Опмсываем точку выхода
 *
 * @param {{output: {path: (__dirname|"name_directory")}}}: указываем название директории где будет лежать собранный проект,
 *  {filename:string},название нашего итогово файла.
 *

 */
module.exports = {

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },

    entry: {
        main: path.resolve(__dirname, 'src', 'ts', "index.ts"),
        style: path.resolve(__dirname, 'src', 'ts', "style.ts")
     
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",

    },

    module: {
        rules: [
           
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
              },

            //   {
            //     test:/\.js$/,
            //     exclude: '/node_modules/',
            //     loader: 'babel-loader',
            // },
         
            {
                test:/\.css$/,
                exclude: '/node_modules/',
                use: [MiniCssPlugin.loader,'css-loader'],
            },
            
            {
                test: /\.(png|jpg|gif|eot|ttf|woff|woff2|jpeg|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    outputPath: './assets'
                }
            },
            {
              test: /\.svg$/,
              loader: 'file-loader',
             options:{
                 name:'[path][name].[ext]',
                 outputPath:'./assets',
             }
                
              
            },
        ]
    },
    plugins: [
        new MiniCssPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HTMLplugin({
            template: path.resolve(__dirname, 'src', "index.html"),
            filename: "index.html"
        })
    ]
   

};