/*
* 目标：
*   1. 学习 jq 的each方法遍历常用的数据结构
*   2. 理解jq隐式调用each方法
*
* */
// $.each([1,2,3], function (index, item) { 
//      console.log(index,item);
// });
// $.each({name: 'zhufeng', age:11}, function (key, value) { 
//       console.log(key,value);
// });
// jq内部隐式调用 each
$('.header>li').click(function () {
     // jq 内部如果发现你获取到是一个元素集合,它会隐式调用each方法循环完成事件绑定。
     // jq事件函数中的 this指向绑定该事件的元素 
     console.log(this);
});