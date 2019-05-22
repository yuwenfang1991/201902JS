/*
* 目标：
*   1. 掌握jq ajax的使用方法、配置参数及意义
*   2. 理解在回调中使用ajax获取的数据
*
* */

$.ajax({
    url: "json/data.json", // 接口地址
    method: 'GET', // 请求方式
    async: false, // 设置同步或者异步, true异步, false同步
    dataType: 'json', // 数据类型，一般为json,也可以设置其他如 xml
    cache: false, // 是否设置缓存, 一般不缓存
    success: function (data) {
        // 在success中才可以拿到请求回来的数据,data形参就是请求回来的数据
        console.log(data);   
    },
    error: function (err) {
        // 如果请求报错了,就会执行error对应函数
        console.log(err);
        
    }
    
});