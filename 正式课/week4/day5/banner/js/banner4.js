// 1.获取元素对象
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
// 记录定时器ID
let autoTimer = null;
// interval 是轮播的间隔时间
let interval = 3000;

//2. 请求数据
$.ajax({
    url: "json/banner.json",
    method: "GET",
    async: false,
    dataType: "json",
    success(data) {
        bindHTML(data);
    },
    error: function (err) {
        console.log(err);
    }
});

// 3.bindHTML 绑定数据
function bindHTML(data) {
    // 3.1 设置基础字符串,图片的、焦点的
    let slideStr = ``,
        focusStr = ``;
    // 3.2 遍历数据 拼接字符串
    data.forEach((item, index) => {
        let { img, desc } = item
        slideStr += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
        focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
    });
    // 为了实现无缝轮播, 我们在末尾需要多拼接一个第一张图片
    slideStr += `<div class="slide"><img src="${data[0].img}" alt="${data[0].desc}"></div>`;
    // 3.3 插入到页面中
    $wrapper.html(slideStr);
    $focus.html(focusStr);
    // 3.4 重新获取$slideList $focusList
    $slideList = $('.slide');
    $focusList = $('.focus > li');
    // 3.5 动态设置wrapper的宽度
    $wrapper.css({
        width: $slideList.length * 1000
    });

}
// 4. autoMove 实现轮播切换
function autoMove() {
    // stepIndex 表示的是container 正在展示的图片索引,如果想让它展示成下一张,我们需要让stepIndex ++
    stepIndex++;
    if (stepIndex >= $slideList.length) {
        $wrapper.css({
            left: 0
        })
        stepIndex = 1;
    }
    $wrapper.stop().animate({
        left: -1 * stepIndex * 1000
    }, 300);
    changeFocus()
}
// 5.changeFocus 实现焦点跟随
function changeFocus() {
    // 因为stepIndex控制轮播图播放顺序不能随意修改,复制一份
    let tmpIndex = stepIndex;
    if (tmpIndex === $slideList.length - 1) {
        tmpIndex = 0;
    }
    $focusList.eq(tmpIndex).addClass('active').siblings().removeClass('active');
}

// 6.handleContainer 鼠标滑入的时候 停止自动轮播 并且左右箭头显示,鼠标滑出 开始自动轮播 并且箭头消失
function handleContainer() {
    // 鼠标滑入
    $container.on('mouseenter', function () {
        clearInterval(autoTimer);
        $arrowLeft.css({
            display: 'block'
        });
        $arrowRight.css({
            display: 'block'
        })
    }).on('mouseleave', function () {
        autoTimer = setInterval(autoMove, interval);
        $arrowLeft.css({
            display: 'none'
        });
        $arrowRight.css({
            display:'none'
        })
    });
}
handleContainer();
// 7.处理箭头点击切换
function handleArrow() {
    // 点击右侧按钮时,效果切换下一张,而我们autoMove方法就是专门处理切换下一张的
    $arrowRight.click(autoMove);
    // 点击左边箭头,切换上一张,而stepIndex控制正在展示的图片索引,就需要stepIndex--
    $arrowLeft.click(function() {
        stepIndex--;
        if(stepIndex < 0) {
            stepIndex = $slideList.length - 2;
        }
        $wrapper.stop().animate({
            left: -1 * stepIndex * 1000
        },200);
        changeFocus();
    });
}
handleArrow()

// 8. 处理焦点图片,点击时切换图片
function handleFocus() {
    $focusList.click(function() {
        let $index = $(this).index();
        stepIndex = $index;
        $wrapper.stop().animate({
            left: -1 * $index * 1000
        },200);
        changeFocus();
    });
}
handleFocus();
autoTimer = setInterval(autoMove, interval);