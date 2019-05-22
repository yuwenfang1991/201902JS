/**
 * 真实项目中,大多数情况下是去监听页面的滚动事件(onscroll事件),在事件函数中计算这张图片什么时候进入浏览器的可视窗口.一旦进入浏览器可视窗口,我们就去加载这张图片
 * 如何计算图片何时进入浏览器的可视窗口
 * 用图片距离body的偏移量(offsetTop是指元素距离最近的有定位属性的父级偏移参照物[offsetParent]的偏移量 - 滚动条卷去的高度 - 浏览器可视窗口的高度) 为0时，就表示图片即将进入浏览器可视窗口。
 * imgOffsetTop - winScrollTop - winH === 0
 * 真实项目中 我们在处理图片懒加载问题时,不是直接操作页面上的img标签,而是动态创建一个img(document.createElement('img')),然后我们让新创建的img去尝试加载,如果加载成功(监听其onload事件,如果成功就会触发onload事件),这时我们再将页面中的img标签的 src设置为图片资源路径
 */
let img = document.getElementById('img');
let dataSrc = img.getAttribute('data-src');
window.onscroll = function () {
    // 事件函数中计算图片何时进入浏览器的可视窗口
    let imgOffsetTop = img.offsetTop;
    let winScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let winH = document.documentElement.clientHeight || document.body.clientHeight;
    if (imgOffsetTop - winScrollTop - winH <= 100) {
        // 真实项目中,我们一般是提前一些让图片去加载,即图片距离出现在浏览器可视窗口还有一段距离的时候就去加载这张图片(imgOffsetTop - winScrollTop - winH > 0 就证明还有一段距离)
        // 新建一个img标签
        let newImg = document.createElement('img');
        // 使用新建的img 标签尝试加载图片
        newImg.src = dataSrc;
        // 监听新建的img 的onload事件
        newImg.onload = function () {
            // 如果onload事件触发了,说明我们尝试加载成功。这时让页面上的这个图片去加载这个资源
            img.src = dataSrc; // 因为newImg尝试过了,确实可以成功,页面中的img可以去加载了
            img.className = 'show';
            // 手动释放内存
            newImg = null;
        }
        img.onerror = function () {
            alert('加载失败');
        }
    }
}

/*
* lazyload.js
* 配合jquery使用的懒加载插件：https://github.com/gitastrophe/lazyload.js
* vue-lazyload.js
* 配合vue使用 https://github.com/hilongjw/vue-lazyload
*
* react-lazy-load：
* 配合react的懒加载工具 https://www.npmjs.com/package/react-lazy-load?tdsourcetag=s_pcqq_aiomsg
*
*
* */
