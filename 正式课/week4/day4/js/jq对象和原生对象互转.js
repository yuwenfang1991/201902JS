/*
* 目标：
* 1. 学习jq对象和原生元素对象互转
* */

// 1.jq对象转原生对象:jq对象中索引对应的就是原生的元素对象,我们可以通过[索引]就能获取到这个原生;此外还有一种方法可以获取这个原生对象
// 1.1[index]
// jq对象.get(index) index 是你想获取的原生对象的索引
// let $ul = $('#emptyUl');
// console.log($ul[0]);
// console.log($ul.get(0));
// 2.原生对象转jq对象;将我们通过原生方法获取到原生对象当做参数传给$方法($(原生对象))就可以把原生对象转成jq对象。
// let ul = document.getElementById('emptyUl');
// let $ul = $(ul);
// console.log($ul);
