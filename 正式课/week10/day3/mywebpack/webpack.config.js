let path = require('path'); // 参数若直接是一个模块的名字 那么这个模块 就是自己下载的模块 或者node自带的模块
// path 是node 自带模块 专门用来处理路径的一个模块
// __dirname 是node 提供的当前文件夹的 绝对路径
console.log('你好', __dirname);
console.log('合并', path.resolve(__dirname, 'myqqq'));

let htmlP = require('html-webpack-plugin');
// 会根据指定的html 文件作为打包的模板
module.exports = {
    mode: 'development', // 对应是生产环境 还是开发环境
    // 生产环境 整个文件没有注释没有换行 代码简洁
    // node 导出
    entry: './src/index.js', // 指定入口文件; 也就是告诉webpack 从哪个文件开始打包 
    output: {
        // path.resolve(__dirname,'自己定义的文件夹名字') 把当前的文件路径和 自己 定义的文件 合并成一个绝对路径 
        path: path.resolve(__dirname, 'myDist'), // 告诉webpack 把打包好的文件 放到哪个位置; 必须是绝对路径
        filename: 'haha.js'// 告诉webpack 打包好的文件 叫什么名字
    },
    module: {
        rules: [
            {
                test:/\.js$/, // 匹配什么样的文件
                use:'babel-loader', //对于匹配的文件使用什么样的loader处理
                exclude:/node_modules/ // 排除node_modules中的文件
                // 使用babel-loader 的时候 需要我们再去配置一个 .babelrc的文件
                // 这个文件跟 webpack.config.js 文件同级; 
                // 这个文件的作用就是告诉 babel-loader用哪个插件去处理js文件
            }
        ]
    },

    plugins:[
        new htmlP({
            // 专门放置一些插件 处理某些loader 不好处理的问题
            template:'./src/index.html' // 指定了 src下的index.html 作为打包的模板
        })
    ]
}

/* 
    npm init -y 处理出一个 package.json 的文件
    安装依赖 webpack webpack-cli 两个主要的依赖
    第一步 建立一个 webpack.config.js 文件 跟package.json 同级
    然后 再去编写 webpack.config.js 文件
    需要导出设置对象
    module.exports = {};
    该设置对象中
        有 entry 使用来指定 入口文件的
        有output 是用来指定出口文件的 需要告诉 webpack 输出的文件名和输出的路径 路径需要是一个绝对路径
        有module 里边是对某些类文件 通过对应的loader进行处理 比如处理js文件
        需要使用babel进行处理 使用babel-loader时 需要另外的 @babel/core 和
        @babel/preset-env 两个插件 还需要我们在配置一个 .babelrc文件
        module:{
            rules:[{
                test:
                use:
                exclude:
            }]
        }
        有 plugins 这里是用的插件 处理哪些 loader不好处理的问题
        怎么 进行打包
        需要我们在package.json 的scripts属性中 配置一个自己的属性 对应的属性值是 webpack
*/