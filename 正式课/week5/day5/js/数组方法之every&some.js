 // 数组.filter(function (item, index) {return 过滤})，item：数组项， index：索引，方法:过滤，把满足条件，即回调函数返回return true的项拿出来组成一个新数组；原数组不变
 let ary = [1,2,3,4,6,10];
let r1 = ary.filter((item, index) =>  item >= 6);

// 数组.every(function(item, index) {return 条件}):用来验证数组的每一项是否满足某个条件(条件就是回调函数的返回值),如果每一个都满足条件就会返回true，否则返回false；
let result = ary.every(function (item, index) {
    return item > 3;
});
console.log(result);

// 数组.some(function (item, index) {return 条件}): 验证数组中是否有一些项满足条件,满足就会返回true，否则返回false；
let r2 = ary.some(function (item, index) {
    return item > 3;
});
console.log(r2);

// 数组.find(function(item, index) {return 条件}): 查找数组中满足条件的第一项，找到第一个就返回,如果有多个都满足条件也只是获取第一个；如果没找到就返回undefined【注意如果找到返回数组项，不是数组】
let r3 = ary.find(function(item, index) {
    return item > 3;
});
console.log(r3);
