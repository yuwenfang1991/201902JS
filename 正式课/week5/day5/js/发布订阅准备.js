let box = document.getElementById('box');
// DOM0:DOM0级事件是在给DOM元素对象的事件属性赋值，但是这个事件属性只能存一个值，多次绑定这个属性存储的就是最后一个事件函数；
// box.onclick = function () {
//   console.log(1);
// };
// box.onclick = function () {
//   console.log(this.innerHTML);
// };


// DOM2：DOM2级事件的每一个事件类型有一个事件池(类似数组的一个东西)，我们每次addEventListener就是向事件池中添加一个方法。添加完后并不会立刻就执行,而是等到触发这个事件的时候才会真正的执行,而且是按照我们之前绑定的顺序把之前添加到事件池中的方法依次执行
// 
box.addEventListener('click', function () {
    console.log(1);
}, false);
box.addEventListener('click', function () {
    console.log(this.innerHTML);
}, false);