/*
* 目标：
*   1. 掌握jq绑定事件的方法
*   2. 掌握jq移除事件的方法
* */
//1. 将原生事件名中的on去掉, 例如onclick,jq提供了一个对应事件名的方法，click(),要把事件触发时的执行的事件函数作为参数传给click方法。
let btn = document.getElementById('btn');
// btn.onclick = function () {
//     alert('来呀，快活呀');
// };
// let fun = function () {
//     alert('欢迎下次再来！');
// }
// $(btn).click(function () {
//     alert('来啊,快活呀！');
// });
// $(btn).click(fun);
// 2.on() 方法: 语法jq对象.on(事件名[不带on],事件函数)
// $(btn).on('click', function () {
//     alert('来啊,快活呀！'); 
// });
// 3.trigger() 用代码触发事件,参数就是不带on的事件名 ；返回值是当前jq对象，可以继续链式调用
// $(btn).trigger('click');
// 4.off() 移除事件 参数是不带on的事件名, 返回值时是当前的jq对象,可以继续链式调用
// $(btn).off('click');