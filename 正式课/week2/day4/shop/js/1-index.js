let productData = null;
// 基于ajax获取数据
let xhr = new XMLHttpRequest();//创建ajax实例对象
// 调用open方法
xhr.open('GET', 'json/product.json', false);
// 监听xhr的 onreadystatechange 事件
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
}
xhr.send(null);// 发送ajax请求

// 解析从服务端获取的数据
productData = JSON.parse(productData);
// 数据绑定
// 获取ul元素
let listBox = document.getElementById('list');
let str = ``;// 模板字符串
for (let i = 0; i < productData.length; i++) {
    let item = productData[i];
    str += `
        <li data-time="${item.time}" data-price="${item.price}" data-hot="${item.hot}">
            <a href="javascript:;">
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <span>￥${item.price}</span><br>
                <span>${item.time}</span><br>
                <span>${item.hot}</span>
            </a>
        </li>`;
}
// 把拼接好的HTML字符串插入到页面中的指定容器
listBox.innerHTML = str;