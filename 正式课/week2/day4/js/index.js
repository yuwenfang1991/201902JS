// 1.获取元素(分析操作谁 就要先获取谁)
let headerBox = document.getElementById('header');
let linkList = headerBox.getElementsByTagName('a');
let listBox = document.getElementById('list');
let productList = listBox.getElementsByTagName('li');
// console.log(linkList,productList);
// 2.按照价格给productList排序
let sortList = function () {
    let innerText = this.innerText;
    // console.log(innerText);
    // 1.getElementsByTagName 获取到的是一个类数组集合,想调用sort,需要把productList转换成一个数组
    let productAry = [].slice.call(productList);
    // let productList = Array.from(productList);
    // let productList = [...productList];
    // console.log(productAry);
    // 2.基于sort 按照价格给productAry排序
    let aInn, bInn;
    productAry.sort((a, b) => {
        switch (innerText) {
            case '上架日期':
                aInn = a.getAttribute('data-time');
                bInn = b.getAttribute('data-time');
                break;
            case '价格':
                aInn = a.getAttribute('data-price');
                bInn = b.getAttribute('data-price');
                break;
            case '热度':
                aInn = a.getAttribute('data-hot');
                bInn = b.getAttribute('data-hot');
                break;
        }
        if (innerText === '上架日期') {
            // 如果点击的是上架日期,我们需要把日期中划线(-)去掉
            aInn = aInn.replace(/-/g, '');
            bInn = bInn.replace(/-/g, '');
        }
        // a、b都是li,我们需要从li中获取价格 getAttribute()方法返回指定属性名的属性值
        // a当前 li b是a 之后的一个li 从中获取价格

        return (aInn - bInn) * this.flag;
        // console.log(aP, bP);
        // return aP - bP; 升序
        // return bP - aP; // 降序
        // return aP - bP; // 升序
        // (aP - bP) * -1 => bP - aP ??
        // (aP - bP) * -1 => aP * (-1) + (-bP * -1) => -aP + bP => bP - aP 降序
        // (bP - aP) * -1 => aP - bP 升序
        // 因为aP-bP能够实现升序排列，如果希望降序排列，这里就需要变成 bP - aP.再次排序我们需要升序排列，就要变成aP - bP
    });
    // console.log(productAry);
    // 3.把排好序的数组中的li依次还要添加到页面中
    for (let i = 0; i < productAry.length; i++) {
        // appendChild 是向容器末尾追加一个新元素，但是listBox里面还是6个，不是12个，只是顺序发生了改变
        listBox.appendChild(productAry[i]);
    }
}
// 循环绑定事件
for (let j = 0; j < linkList.length; j++) {
    //因为前面的操作，是三个按钮点击时修改的是全局中的flag变量,所以会引发排序混乱问题
    linkList[j].flag = -1;
    // 给价格按钮绑定点击事件，在事件触发时调用sortList方法
    linkList[j].onclick = function () {
        //重置其他两个a标签里面的flag
        for(let k = 0; k < linkList.length; k++) {
            if(linkList[k] !== this) {
                // 重置其他两个a标签里面的flag
                linkList[k].flag = -1;  
            }
        }
        // 让flag在-1 和 1 之间来回切换，就能实现升降序的来回切换
        this.flag *= -1;

        // 事件函数中的this使我们点击的元素,我们想让sortList里面也知道点击的是谁,这时候如果我们能够让 sortList 里面的 this 也变成事件函数中的 this？
        // 这个时候问题就变成了如何让sortList里面的 this 变成事件函数中的this
        sortList.call(this);
    }
}


/* 
 * DOM映射:页面中的 HTML 元素和通过js相关方法(getElementById/getElementsByTagName/getElementsByClassName([不含querySelect和 querySelectAll])获取的元素集合和元素对象存在映射关系。（一个改，另一个也会跟着改）
 * xxx.style.backgroundColor = 'red':将xxx 元素对象对应的堆内存空间里面的style属性下的 backgroundColor 属性值修改成了red;(本质是操作js的堆内存)但是有DOM映射机制,元素标签和堆内存是绑定的，只要我们修改了堆内存空间里面的值，元素就会按照最新的值渲染。
 * appendChild：向容器末尾追加一个元素，但是如果这个元素已经存在于之前容器中,此时,不是复制一份一模一样的再插入到容器末尾,而是直接把这个 元素移动 到容器末尾。
 */