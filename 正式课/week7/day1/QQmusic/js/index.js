// 获取元素
let $btn = $('.music_icon');
let $contentBox = $('.content_box');
let $footerBox = $('.footer_box');
let $lyricBox = $('.lyric_box');
let $audio = $('#audio');
let $currentStart = $('.currentStart');
let $progressInner = $('.progressInner');
let $currentEnd = $('.currentEnd');
let translateY = 0;
let timer = null;
// 控制唱到第几句上移的
let index = 0;


let isRunning = false; // 判断按钮是否在旋转
function touchClick() {
    $btn.on('touchend', function () {
        if (isRunning) {
            $(this).css({ animationPlayState: 'paused' });
            isRunning = false;
            $audio[0].pause();
            clearInterval(timer);
        } else {
            $(this).css({ animationPlayState: 'running' });
            isRunning = true;
            $audio[0].play();
            setTime();

        }
    });

    // 当音频可以播放 的时候触发该函数
    $audio[0].addEventListener('canplay', function () {
        let str = dealTime(this.duration);
        $currentEnd.html(str);
    });
}

touchClick();

// 初始化歌词部分的高度
function initHeight() {
    // 用底部和到 body的距离 - 歌词盒子到body的距离 就是歌词盒子的高度
    let h = $footerBox.offset().top - $contentBox.offset().top;
    $contentBox.css({ height: h });
}

initHeight();

// 获取歌词
function getLyric() {
    let p = new Promise(function (res, rej) {
        $.ajax({
            url: './json/music.json',
            type: 'GET',
            success: function (data) {

                // 成功获取的数据
                res(data);
            },
            error: function (err) {
                // err 是失败的信息
                rej(err);
            }

        });
    });

    // p 是 Promise实例
    return p;
}

// 处理歌词
function dealLyric(data) {
    let str = data.lyric;//拿到歌词字符串
    let reg = /\[(\d{2})\:(\d{2})\.\d+\]([^\[]+)/g;
    let htmlStr = '';

    str.replace(reg, function (q, m, s, lyric) {
        // 只要字符串中有符合正则的 就会一直执行replace 的回调函数
        // console.log(arguments);
        // 目的是把 获取到的时间歌词 展示到页面上

        htmlStr += `<p m='${m}' s='${s}'>${lyric}</p>`;
    });

    $lyricBox.html(htmlStr);
}


getLyric().then((data) => {
    dealLyric(data)

}, (data) => {
    console.log(data);

});

// 处理音乐时间
// 用currentTime和 duration做处理
// 把时间处理成 00:00 的格式
// 进度条

function dealTime(time) {
    // 分钟数
    // let m = parseInt(time / 60);
    let m = Math.floor(time / 60);
    // 秒数
    // let s = parseInt(time -  m * 60);
    let s = Math.floor(time - m * 60);
    // 若 m 小于10 就会补 0
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    return m + ':' + s;

}

// 设置播放时间和进度条
function setTime() {
    timer = setInterval(() => {
        // 当前播放时间
        let ct = $audio[0].currentTime,
            dt = $audio[0].duration;
        $currentStart.html(dealTime(ct));
        $progressInner.css({
            width: ct / dt * 100 + '%'
        });
        matchLyric();
        if ($audio[0].ended) {
            // 若是true 说明播放结束
            // 清除定时器
            clearInterval(timer);

            // 还需要控制按钮 走成停止状态 即可
            isRunning = false;
            $btn.css({ animationPlayState: 'paused' });

        }
    }, 500);

}

// 匹配歌词

function matchLyric() {
    // 需要当前时间 来匹配对应的歌词
    let ct = $audio[0].currentTime;
    let ary = dealTime(ct).split(':');
    // dealTime(ct) 00:23 --> ['00', '23']
    // 获取到了所有的 歌词
    let $p = $lyricBox.find('p');
    // 从所有p中 筛选出 符合条件 (符合 m 和 s) 的 p;
    // 给这个p 加上类名 他的兄弟 移除类名
    let curEle = $p.filter(`[m='${ary[0]}']`).filter(`[s='${ary[1]}']`);;

    console.log(curEle);
    // 从所有的 p中筛选出 m是 ary[0] 并且s是 ary[1] 的 p标签
    // 把当前的p 加上active 类名 兄弟们移除类名; 在这之前 curEle 有可能是空
    // 若是空 则不用进行添加类名 的操作

    if (!curEle.length) return;
    if (curEle.hasClass('active')) return; // 若两个定时器内唱的是 同一句歌词 不在执行下边函数
    // $('.active') // 需要上移的那一行
    moveLyric(curEle);
    curEle.addClass('active').siblings().removeClass('active');

}

// 移动歌词的思路
// 改变歌词盒子的top值 或者 translateY;每次改变的值是当前歌词的高度

function moveLyric() {
    index++;
    if (index < 3) return;
    let height = $('.active').offset().height;// 要移动的那一行的高度
    translateY += height; // 每次上移都要 在原来的基础上 接着上移
    $lyricBox.css({ transform: `translateY(${-translateY}px)` });
}




























// getLyric().then((data)=> {
//     console.log(data);
//     return 123;
// }, (data)=>{
//     console.log(data);

// }).then((data)=>{
//     // 第二个then 中的函数的参数 是由第一个then 的回调函数return 值决定的
//     // 第二个then 中的两个回调函数 是针对 第一个then 中函数执行的结果来说的 
//     console.log(data);

// },(data)=>{
//     console.log(data);

// });