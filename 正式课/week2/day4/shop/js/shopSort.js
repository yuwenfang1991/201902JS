// 获取要操作的元素
let header = document.getElementById('header');
let headerBox = header.getElementsByTagName('a');
let list = document.getElementById('list');
let productList = list.getElementsByTagName('li');
// console.log(headerBox,productList);
// 先基于价格排序
// let flag = -1;
let sortList = function (that,index) {
    // 将类数组转换为数组
    let productArr = [...productList];
    // console.log(productArr);
    // 基于sort按照价格给 li 排序 
    // let aInn, bInn;
    productArr.sort((a, b) => {
        let ary = ['data-time','data-price','data-hot'];
        let aInn = a.getAttribute(ary[index]);
        let bInn = b.getAttribute(ary[index]);
        let reg = /-/g;
        if(index === 0) {
            aInn = aInn.replace(reg,'');
            bInn = bInn.replace(reg,'');
        }
        return (aInn - bInn) * that.flag;
    });
    // 将排好序的li插入到 ul#list (id为 list的 ul中)
    for (let j = 0; j < productArr.length; j++) {
        list.appendChild(productArr[j]);
    }
}
// 循环绑定点击事件
for (let k = 0; k < headerBox.length; k++) {
    headerBox[k].flag = -1;
    headerBox[k].onclick = function () {
        for(let l =0; l < headerBox.length; l++) {
            // 重置其他a 标签的flag
            if(headerBox[l] !== this) {
                headerBox[l].flag = -1;
            }
        }
        // 让flag 在-1和1之间来回切换
        this.flag *= -1;
        sortList(this,k);
    }
}
