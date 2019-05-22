let $tab = $('.tab');
let $tabBody = $('.tab_body');
let $swiperWrapper = $('.swiper-wrapper');
let $listBox = $('.list_box');
// let $ul1 = $('.tab').eq(1); // 固定的ul
// let $ul2 = $('.tab').eq(2); // 悬浮的ul
$tab.on('click', function (e) {
    // console.log($(e.target).index());
    // $xxx.index() 是获取该元素在父盒子中的索引值
    let $target = $(e.target);
    // 下面的代码必须保证点击的是 li 元素
    // 所以我们使用标签名 作为判断的依据
    if ((e.target).tagName.toUpperCase() !== 'LI') return;
    let n = $target.index();
    $target.addClass('current').siblings().removeClass('current');
    // 固定的ul 下的 li
    // $ul1.find('li').eq(n).addClass('current').siblings().removeClass('current');
    // 悬浮的ul 下的 li
    // $ul2.find('li').eq(n).addClass('current').siblings().removeClass('current');
    $(this).find('li').eq(n).parent().prev().find('li').eq(n).addClass('current').siblings().removeClass('current');
    $tabBody.addClass('hide').eq(n).removeClass('hide');
    // console.log($(this).find('li').eq(n).parent().next()); // this 是绑定的点击事件的原生对象    

});

function swiperInit() {
    let swiper = new Swiper('.swiper-container', {
        autoplay: true,
        effect : 'cube',
        pagination: {
            el: '.swiper-pagination',
            // type: 'bullets',
            type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },
        loop: true
    });
}


// 获取banner数据
function getData() {
    $.ajax({
        url: "./json/data.json",
        type: "GET", // 老版的是type , 新版的是meth
        success: function (data) {
            // 请求成功之后的回调函数
            renderBanner(data);
            // 初始化swiper时 需要保证banner已经渲染完成
            swiperInit();

        },
        error: function () {
            // 请求失败后的回调函数
        }
    });
}

// 把从后台获取到的数据渲染到页面

function renderBanner(ary) {
    let str = '';
    ary = ary || []; // 容错机制
    ary.forEach(item => {
        let { src, text, href } = item;
        str += `<div class="swiper-slide">
                    <img src="${src}" alt="">
                </div>`;

    });
    $swiperWrapper.html(str);
}

getData();

// 请求列表数据
function getList() {
    $.ajax({
        url: './json/list.json',
        type: 'GET',
        success: function (data) {
            // console.log(data);
            renderList(data);

        },
        error: function () {

        }
    })
}

getList();

function renderList(ary) {
    ary = ary || [];
    let str = '';
    ary.forEach(item => {
        let { type, text, img, commentNum } = item;
        switch (type) {
            case 0:
                str += `<li class="none_pic">
                <p>${text}</p>
                <div class="comment_box">
                    <span>${commentNum}</span>
                    <span class="icon_com"></span>
                </div>
            </li>`
                break;
            case 1:
                str += ` <li class="one_pic">
                <div class="img_box">
                    <img src="${img[0]}" alt="图片">
                </div>
                <div class="content_box">
                    <p>${text}</p>
                    <div class="comment_box">
                        <span>${commentNum}</span>
                        <span class="icon_com"></span>
                    </div>
                </div>
            </li>`;
                break;
            case 2:
                str += ` <li class="two_pic">
                <div class="img_box">
                    <img src="${img[0]}" alt="">
                </div>
                <div class="img_box">
                    <img src="${img[1]}" alt="">
                </div>
            </li>`;
                break;

            default:
                str += `<li class="three_pic">
                <p>${text}</p>
                <div class="three_box">
                    <div class="img_box">
                        <img src="${img[0]}" alt="">
                    </div>
                    <div class="img_box">
                        <img src="${img[1]}" alt="">
                    </div>
                    <div class="img_box">
                        <img src="${img[2]}" alt="">
                    </div>
                </div>
                <div class="comment_box">
                    <span>${commentNum}</span>
                    <span class="icon_com"></span></div>
            </li>`;
                break;
        }
    });
    // $listBox.html(str);
    // $listBox[0].innerHTML += str;
    $('.list_box').append(str);
}

function toTop() {
    // 实现悬浮
    // 比较 卷去的高度 和 tab 距离body 的上边
    let sT = document.documentElement.scrollTop || document.body.scrollTop;
    let targetTop = $('.tab').eq(1).offset().top; // offset 返回值时一个对象
    // debugger;
    // if(sT >= targetTop) {
    //     // 说明tab 的上边 已经到达顶部
    //     $('.fixed').removeClass('hide');
    // } else {
    //     $('.fixed').addClass('hide');
    // }
    sT >= targetTop ? $('.fixed').removeClass('hide') : $('.fixed').addClass('hide');

}



function loadMore() {
    // 用top 这个元素到body的距离 跟卷去高度作比较
    let sT = document.documentElement.scrollTop || document.body.scrollTop;
    let cH = document.documentElement.clientHeight || document.body.clientHeight;
    let targetTop = $('.top').offset().top;
    // debugger;
    console.log(sT, cH, targetTop);
    // console.log(sT + cH );
    if (sT + cH + 10 >= targetTop) {
        getList();// getList 获取新元素 会默认调用新元素
        // console.log('到底了');

    }
}

window.onscroll = function () {
    toTop();
    loadMore();
}
// loadMore();