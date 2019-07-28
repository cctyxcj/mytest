//导入处理路径的模块
var path = require('path')
// var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack =require('webpack')

//导出一个配置对象,将来webpack在启动的时候,会默认来查找webpack.config.js,并读取这个文件中导出的配置对象,来进行打包处理
    module.exports ={
        entry : path.resolve(__dirname,'./main.js'),// 项目入口文件
        output : {
            path: path.resolve(__dirname,'js'), //配置输出的路径
            filename:'mm.js'    // 配置输出的文件名
        },
        module:{
            rules:[
                 {
                     test:/\.css$/,//支持正则
                     loader:['style-loader','css-loader']
                 }
            ]
        },
        //其他解决方案配置
        // resolve: {
        //     extensions: ['', '.js', '.json', '.css']//添加在此的后缀所对应的文件可以省略后缀
        // },
        //插件
        plugins:[
            new webpack.BannerPlugin('This file is created by ly')
        ]
    }