; (function () {
    // 请求地址
    const url = 'json/product.json';
    // 元素容器
    const list = document.getElementById('list');
    const header = document.getElementById('header');
    const headerList = header.getElementsByTagName('a')
    // 排序的字段
    // price价格,time时间,hot热度
    const sortAttr = ['time', 'price', 'hot'];
    // 数据的容器
    let productList = [];

    //获取初始数据
    function getProductData(url) {
        // 获取数据
        const xhr = new XMLHttpRequest();
        // 调用open方法
        xhr.open('GET', url, false);
        // 监听xhr的 onreadystatechange事件
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                const productData = _utils.toJSON(this.responseText);
                productList = productData;
                
                
            }
        }
        // 发送ajax请求
        xhr.send();
    }

    // 用来渲染列表数据
    function renderList(ele, data) {
        let str = ``;
        data.forEach(item => {
            const {
                title,// 商品名称
                price,//价格
                time,//时间
                hot, //热度
                img, // 商品图片
            } = item;
            str += `
            <li>
                <a href="javascript:;">
                    <img src="${img}" alt="">
                    <p>${title}</p>
                    <span>价格：${price}</span> <br>
                    <span>上架时间：${time}</span> <br>
                    <span>热度：${hot}</span>
                </a>
            </li>
            `;
        });
        ele.innerHTML = str;
    }

    // 给排序按钮绑定点击事件
    function bindEvent() {
        for (let i = 0; i < headerList.length; i++) {
            headerList[i].flag = -1;
            headerList[i].onclick = function () {
                for(let j = 0; j < headerList.length; j++) {
                    // 重置其他a 标签的 flag
                    if(headerList[j] !== this) {
                        headerList[j].flag = -1;
                    }
                }
                this.flag *= -1;
                const sid = this.getAttribute('sort-id');
                // 排序的字段
                sortList(sortAttr[sid], this.flag);
            }
        }
    }

    // 负责对数据进行排序
    function sortList(attr, flag) {
        attr.sort((a, b) => {
            let reg = /^(?:(?!0000)[\d]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[\d]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[\d]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
            
            let p1 = a[attr];
            let p2 = b[attr];
            if (reg.test(p1,p2)) {
                p1 = a[attr].replace(/-/g, '');
                p2 = b[attr].replace(/-/g, '');
            }
            console.log(p1,p2);
            return (p1 - p2) * flag;
        })
        renderList(list, productList);
    }

    // 排序按钮事件绑定 
    bindEvent();

    // 先获取初始数据
    getProductData(url)
    // 渲染初始页面
    renderList(list, productList);

})()
