const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports={
    entry:"./src/main.js",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            // {test:/\.(png|jpg|gif))$/,use:'url-loader'},
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
}