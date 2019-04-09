"use strict";
window.onload = function () {
    var imgLists = document.querySelectorAll('.imgBox>img');
    var imgBox = document.querySelector('.imgBox');
    // console.log(imgLists);
    // 获取图片的张数
    var len = imgLists.length;
    var itemDeg = 360 / len;
    for (var i = 0; i < len; i++) {
        imgLists[i].style.transform = "rotateY(" + itemDeg * i + "deg)translateZ(400px)";
        imgLists[i].style.transition = "1s " + (len - 1 - i) * 0.2 + "s";
    }
    var num = 0;
    setInterval(function () {
        num++;
        var value = num * 0.2;
        imgBox.style.transform = "rotateX(-10deg) rotateY(" + value + "deg)";
    }, 30);
}