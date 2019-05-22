/**
 * 常见的异步操作: 定时器  ajax请求 
 * 发现是异步 则放到等待队列
 * 主队列执行同步代码
 * 等待主队列中的代码 需要等待 主队列执行完毕才能执行
 */

setTimeout(() => {
    console.log(2);
    
}, 0);

 for (let i = 0; i < 9999999; i++) {

 }

 console.log(1);


//  Promise 是ES6 新增的一个类
let p = new Promise(function (resolve, reject) {
    // resolve 是成功的回调
    // reject 是失败的回调
    console.log(123);
    reject();
    resolve();
    // resolve 和 reject 只会执行一个
    
});

// 可以是一个函数
// then 有两个实参: 分别对应 resolve reject
p.then(function() {
    console.log('success');
    
}, function() {
    console.log('failure');
    
});

// Promise 解决了 回调地狱问题