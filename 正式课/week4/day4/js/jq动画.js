/*
* 目标：
*   1. 掌握jq简单动画效果
*   2. 掌握animate方法
*   3. 理解停止动画、结束动画
*
* */
// 1.hide() / show() 隐藏元素 / 显示元素 参数是完成动画时间(ms),还可以写  'slow' 慢(600毫秒), 'fast' 快(200ms)
// $('#btn1').click(function () { 
//     $('.a-obj').hide(3000);
// });
// $('#btn2').on('click', function () {
//     $('.a-obj').show(3000);
// });
// 2. slideUp() / slideDown() 滑动收起 / 向下滑动展开
// $('#btn1').click(function () { 
//     $('.a-obj').slideUp();
// });
// $('#btn2').click(function () { 
//     $('.a-obj').slideDown();
// });
// 3. fadeIn() / fadeOut() 淡入淡出
// $('#btn1').click(function () { 
//     $('.a-obj').fadeOut();
// });
// $('#btn2').click(function () { 
//     $('.a-obj').fadeIn();
// });
// 4.slideToggle() 第一次如果是收起的,执行 slideToggle就是展开,如果上次是展开的,我们执行slideToggle就是收起,适合做点击展开,再点击收起的需求
// $('#btn3').click(function () { 
//    $('.a-obj').slideToggle(); 
// });
// 5.animate 语法: $(selector).animate(target, duration,easing, afterCallback)
// $('.a-obj').animate({
//     left:300
// },3000);
// 6. stop() 停止当前元素正在进行的动画,不管到没到终点都得停
// 7. finish() 停止当前元素正在进行的动画,但是它是忽略动画规定的时间,一下子到达终点