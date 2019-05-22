// 声明一个变量 准备装ajax请求回来的数据
let productData = null;
// 利用ajax获取数据
let xhr = new XMLHttpRequest();
xhr.open('GET','json/product.json','false');
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
        // xhr的responseText属性存储着从服务端获取的数据
        productData = xhr.responseText;
    }
}
xhr.send(null);
// console.log(productData);
// 解析从服务端获取的数据
productData = JSON.parse(productData);
console.log(productData);
