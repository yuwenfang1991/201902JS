/*
* 目标：
*   1. 熟悉如何向jq自身上扩展方法
*   2. 熟悉如何向jq原型上添加方法
*
* */
// 1.向jq 自身上扩展方法: $.extend({方法名:方法对应的函数,...})
// 2.向jq的原型上扩展方法:$.fn.extend({方法名:function() {},...})
$.fn.extend({
    hello:function () {
        console.log('hello world');
    }
});
$('#fields').hello();