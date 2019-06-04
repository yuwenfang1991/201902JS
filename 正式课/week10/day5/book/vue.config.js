module.exports = {
    publicPath:'./', // 修改基础路径
    // baseUrl:'./',
    lintOnSave: false, // 在保存代码时 忽略eslint

    devServer: {
        // open: true,
        // host: '0.0.0.0',
        // port: 8080,
        // https: false,
        // hotOnly: false,
        
        proxy: {
            // 只对本地开发起作用
            "^/nba": {
                // target: "http://yapi.demo.qunar.com", // 我们要转接到的域
                target:"https://www.easy-mock.com",
                ws: true, // 默认true
                changeOrigin: true, // 是否改变域
                pathRewrite: { // 路径重写
                    // "^/api": "/mock/24076/api", // rewrite path 
                    "^/nba":"/mock/5cd4edc7e393cf7606e9d2f4/nba",
                    // 假如我们访问的路径是以/api开头的 统一转到了/mock/24076/api这个路径
                    // "^/book": "/book"
                }
            }
        }
    }
};
