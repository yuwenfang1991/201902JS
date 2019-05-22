/*
* II. 目标
*   1. 实现无缝轮播
*   2. 实现焦点跟随
* */

/**
 * 轮播图需求:
 *  1. 实现一个轮播图,要循环播放(如果播放到最后一个,在播放的时候就要播放第一个)
 *  2. 轮播图下面的小点(焦点) 也跟着动
 *  3. 鼠标放到轮播图展示窗口上的时候停止自动轮播,停止自动播放后,手动切换按钮(左右两个箭头)要出现,并且点击左右两个箭头,也能实现手动切换,点击左边的时候展示上一张,点击右侧的时候展示下一张,手动切换也要满足循环播放
 *  4. 点击轮播图下面的小点(焦点)也要切换到对应到图片展示
 * 
 */

/**
 * 轮播图原理
 *  1. 在最外层有一个container的盒子,这个盒子的宽高只能展示一张图片,其余的溢出隐藏(overflow: hidden);
 *  2. 在container下面还有一个盒子 wrapper, 这个wrapper下面包裹的都是图片,这些图片都在一行展示
 *  3. 所谓轮播就是: 让wrapper 相对于container绝对定位 ,默认展示第一张图片,轮播一次就是让wrapper向左边移动一张图片宽度,这时container就展示的是第二张图片,如果再轮播一次, 就是让wrapper 向左移动一张图片的宽度,这时container展示的就是第三张图片 ,以此类推,我们发现 container正在展示的图片, 就是wrapper的 left值就是: -1 * 当前图片的索引 * 图片的宽度.
 *  4. 所以我们想让container 展示索引为n的图片, 就把wrapper的 left值设置为: -1 * n * 图片的宽度; 所以我们定义一个 变量用来记录当前展示图片的索引, 我们称其为 stepIndex, 并且因为页面打开时就需要展示第一张图片,而第一张图片的索引是0,所以stepIndex初始值为0
 *  5. 我们想轮播一次,就让stepIndex++, 然后将wrapper 的left值设置为: -1 * stepIndex * 图片的宽度。如果想让它动画过去,就把动画的终点设置为-1 * stepIndex * 图片宽度
 * 
 */

/**
 * 无缝轮播实现: 我们向$slideList末尾多拼接一个第一张图片,当轮播到最后一张时,container展示的图片和第一张一样,给人的感觉已经从最后一张播到第一张了,此时我们把wrapper的 left设置为0,这个设置只需要很短的时间,同时修改stepIndex为1,这时再轮播时container展示的就是第二张图片.
 */
// 1. 获取元素对象
let $container = $('.container'),
    $wrapper = $('.wrapper'),
    $focus = $('.focus'),
    $arrowLeft = $('.arrowLeft'),
    $arrowRight = $('.arrowRight'),
    $slideList = null,
    $focusList = null;

// 配置轮播所需参数
// 记录当前正在轮播的图片索引,因为我们需要使用索引来控制轮播
let stepIndex = 0;  
// 记录定时器id, 以便于我们想停止轮播时可以清除定时器
let autoTimer = null;
// interval 是轮播的间隔时间
let interval = 3000;

//  2.请求数据
$.ajax({
    url: "json/banner.json",
    method: 'GET',
    async: false,
    dataType: "json",
    success(data) {
        bindHTML(data);
    },
    error: function (err) {
        console.log(err);

    }
});

// 3. bindHTML 绑定数据
function bindHTML(data) {
    // 2.1 设置基础字符串,图片的、焦点的
    let slideStr = ``,
        focusStr = ``;
    // 2.2 遍历数据 拼接HTML字符串
    data.forEach((item, index) => {
        let { img, desc } = item;
        slideStr += `<div class="slide"><img src="${img}" alt="${desc}"></div>`
        focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
    });
    // 为了实现无缝轮播, 我们在末尾需要多拼接一个第一张图片
    slideStr += `<div class="slide"><img src="${data[0].img}" alt="${data[0].desc}"></div>`;
    // 2.3 插入到页面中
    $wrapper.html(slideStr);
    $focus.html(focusStr);
    // 2.4 重新获取$slideList $focusList
    $slideList = $('.slide');
    $focusList = $('.focus > li');
    // 2.5 动态设置wrapper的宽度
    $wrapper.css({
        width: $slideList.length * 1000
    });
}

// 4. autoMove 实现轮播切换
function autoMove() {
    // stepIndex 表示的是container 正在展示的图片索引, 如果想让它展示成下一张,我们需要让stepIndex ++
    stepIndex ++; 
    if (stepIndex >= $slideList.length) {
        // 当stepIndex >= $slideList.length 说明已经播到最后一张(因为我们给$wrapper 多拼接了一个第一张,所以播到最后一张的时候,container 真实图片的第一张),再播就该播真实图片的第二张了, 所以stepIndex应该设置成1
        $wrapper.css({
            left: 0
        });
        stepIndex = 1;        
    }
    $wrapper.animate({
        left: -1 * stepIndex * 1000
    },300);
    changeFocus();
}

// 5.changFocus 实现焦点跟随
function changeFocus() {
    //播第一个图片时第一小点选中,播第二个的时候是不是第二个小点选中
    // 因为stepIndex控制着播放第几张, 所以stepIndex对应的小点也应该选中
    // 但是因为我们把第一张图片复制了一份放在了末尾,所以当播到最后一张的时候,container展示的是第一张图片,所以对应着我们应该让第一个小点选中。
    // 因为stepIndex控制轮播图播放顺序,我们不能随意修改,复制一份
    let tmpIndex = stepIndex;
    if (tmpIndex === $slideList.length - 1) {
        tmpIndex = 0;
    }
    $focusList.eq(tmpIndex).addClass('active').siblings().removeClass('active');
}
autoTimer = setInterval(autoMove, interval);