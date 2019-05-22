/*
* 目标：
*   1. 理解发布订阅思想
*   2. 实现一个基础版发布订阅
*
* */

/**
 * 发布订阅模式：是模拟的DOM2级事件的事件池思想。我们准备一个计划(计划是一个容器，这个用来装某一时刻到来时要执行的方法)，但是添加的方法不会立刻就执行了，而是等待这个时刻的到来再执行这些方法，而且是按照订阅事件的顺序触发（就是向计划中添加方法的顺序）；
 */
// 发布订阅
// 订阅(向计划中添加方法)  
// 发布(时机到来把这些方法都执行) 
// 取消订阅(把之前添加的方法移除掉)

// 准备计划
let ary = [];
function add(fn) {
    ary.push(fn);
}

function fire(...arg) {
    ary.forEach(item => item && item(...arg));
}

function remove(fn) {
    // 数组.filter(function (item, index) {item：数组项， index：索引}) 方法:过滤，把满足条件，即回调函数返回return true的项拿出来组成一个新数组；原数组不变
    ary = ary.filter(item => item !== fn);
}

function f1(_this) {
    console.log(_this);
    
    console.log(1);
}

function f2(_this) {
    console.log(_this);
    
    console.log(2);
}

function f3(_this) {
    console.log(_this);
    
    console.log(3)
}

add(f1);
add(f2);
add(f3)

setTimeout(function () {
    fire(this);
}, 5000);