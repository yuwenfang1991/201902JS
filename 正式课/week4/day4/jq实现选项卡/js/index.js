$(function ($) {
    // 获取元素
    let $header = $('.header > li');
    let $panelList  = $('.panel > div');
    // 2.绑定点击事件
    $header.click(function () { 
        // console.log(this);
        // this是当前点击的 li并且是原生元素对象
        let $index = $(this).index(); // 获取当前点击的li的索引
        console.log(this);
        
        $(this).addClass('active').siblings().removeClass('active');
        // $(this).addClass('active') // 为当前点击的li增加 active类名
        // $(this).addClass('active').siblings() // 获取当前点击的li的兄弟们
        // $(this).addClass('active').siblings().removeClass('active'); // 移除当前点击li的兄弟们的 active类名
        // $panelList.eq($index) // 获取和当前点击li的索引相同的 div
        // $panelList.eq($index).addClass('active') // 给点击的li的索引相同的 div 添加一个active
        // $panelList.eq($index).addClass('active').siblings() // 获取当前展示的div的兄弟们
        // eq() 方法是获取当前jq对象或者集合中指定索引的 元素对象,并且包装成jq对象返回
        // siblings() 获取当前元素的兄弟们(当前元素的所有的哥哥和所有的弟弟)
        $panelList.eq($index).addClass('active').siblings().removeClass('active'); // 移除 当前展示div的兄弟们的 active类名
        // $(this).addClass('active').siblings().removeClass('active').parent().next().children().eq($index).addClass('active').siblings().removeClass('active');
    });
})
$(function ($) {
    // DOMContentLoaded 事件: 标志着页面的DOM结构已经加载完毕,加载完毕后就会触发这个事件
    // window.onload 事件: 页面内所有的资源(图片、字体、css...)下载完成后才触发
    // 写在$(function ....) function 就是在页面DOM结构加载完成后执行的函数,并且 $就是jq,就会被注入到这个函数中,可以使用。
});