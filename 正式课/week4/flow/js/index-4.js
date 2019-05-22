~function () {
    // 导入依赖工具
    const { toJSON, likeAryTo, win, offset} = window._utils;
    // 获取操作的元素
    const cols = document.querySelectorAll('#flowBox>li');
    const imgAll = document.getElementsByTagName('img');
    // 将元素集合转换成数组
    const flowCols = likeAryTo(cols);
    // const flowCols = Array.from(cols);

    // 获取图片数据
    function getImgData() {
        // 创建ajax实例
        const xhr = new XMLHttpRequest();
        // 配置请求方式
        xhr.open('GET', './json/data.json', false);
        // 监听数据响应
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                // 字符串拼接方式
                // renderHTML(toJSON(this.responseText));
                // 动态创建
                renderDOM(toJSON(this.responseText));
            }
        }
        // 发送ajax请求
        xhr.send();
    }

    // 数据绑定 动态创建
    function renderDOM(data) {
        data.forEach(item => {
            // 动态创建DOMs
            const dom = createDOM(item);
            // 对列进行排序
            flowCols.sort((a, b) => a.offsetHeight - b.offsetHeight);
            flowCols[0].appendChild(dom)
        });
    }

    function createDOM(item) {
        const { link, src, title, height } = item;
        // 创建a 标签
        const a = document.createElement('a');
        a.href = link;
        // 创建img标签
        const img = document.createElement('img');
        // 最开始显示默认图片
        img.src = './images/load.gif';
        img.setAttribute('height', height);
        // 真实图片地址保存到元素自身标签属性img-src
        img.setAttribute('img-src', src);
        // 创建p标签
        const p = document.createElement('p');
        p.innerHTML = title;
        p.setAttribute('class', 'title');
        // 将img p元素 分别追加到 a元素内
        a.appendChild(img);
        a.appendChild(p);
        return a;
    }


    // 图片懒加载
    function lazyImg() {
        // 如何判断图片出现在可视区域
        // 页面卷去的高度 + 浏览器窗口的高度 >= offsetTop + offsetHeight
        const sTop = win('scrollTop');
        const winH = win('clientHeight');
        for (let i = 0; i < imgAll.length; i++) {
            const img = imgAll[i];
            // 避免重复加载
            if (img.load) continue;
            const top = offset(img).top;
            const height = img.offsetHeight;
            if (sTop + winH >= top + height) {
                const src = img.getAttribute('img-src');

                // img.src = src 图片地址有可能是无效的
                // 为了保证图片有效性
                let tempImg = new Image();
                console.log(tempImg);
                tempImg.src = src;
                
                
                // 图片加载成功事件
                tempImg.onload = function () {
                    img.src = this.src;

                    // 标记图片已经加载
                    img.load = true;
                    tempImg = null;
                }
            }
        }
    }

    /*
        // 数据绑定 - 字符串拼接方式
        // function renderHTML(data) {
        //     data.forEach(item => { // item 是每条图片数据对象
        //         const htmlStr = createHtml(item);
        //         // 根据每列自身高度进行排序
        //         flowCols.sort((a,b) => a.offsetHeight - b.offsetHeight);
        //         // 把当前HTML字符串 追加到 高度最矮的 那一列
        //         // 字符串拼接方式 每次追加 都会导致整个页面 重新渲染 将之前的覆盖掉
        //         flowCols[0].innerHTML += htmlStr;
    
        //     });
        // }
    
        // 数据拼接
        // function createHtml(item) {
        //     const { link, src, title, height } = item;
        //     return `
        //     <a href="${link}">
        //     <img src="${src}" alt="" height="${height}">
        //     <p class="title">${title}</p>
        //     </a>
        //     `
        // } */


    // 加载更多
    function loadMore() {
        // 纵向滚动条 滚动距离
        const sTop = win('scrollTop');
        // 整个页面高度(clientHeight + 溢出内容(sTop最大值))
        const sHeight = win('scrollHeight');
        // 当前可视窗口一屏的 高度(浏览器窗口高度)
        const winH = win('clientHeight');
        // 函数节流和防抖 优化频繁调用数据加载
        if (sTop + winH >= sHeight - 200) {
            getImgData();
        }
    }

    // 请求初始数据
    getImgData();
    // 懒加载初始数据
    lazyImg();



    // 监听滚动条滚动事件
    window.onscroll = function () {
        loadMore();
        lazyImg();
    }

    // => ajax请求数据
    // => render(data)
    // => data.forEach(item)
    // => createHtml(item)
    // => htmlStr 
}()