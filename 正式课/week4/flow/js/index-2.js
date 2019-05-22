~function () {
    //导入依赖
    const { win, toJSON, offset } = window._utils;
    // 获取操作元素
    const cols = document.querySelectorAll('#flowBox > li');
    const imgAll = document.getElementsByTagName('img');

    const flowCols = Array.from(cols);
    // 获取图片数据
    function imgData() {
        // 创建ajax实例
        const xhr = new XMLHttpRequest();
        // 调用open方法
        xhr.open('GET','json/data.json',false);
        // 监听xhr的 onreadystatechange事件
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
               renderDOM(toJSON(this.responseText));
                
            }
        }
      xhr.send(null);
    }
    
    // 数据绑定 动态创建
    function renderDOM(data) {
        data.forEach(item => {
            // 动态创建DOMs
            const dom = createDOM(item);
            flowCols.sort((a, b) => a.offsetHeight - b.offsetHeight);
            flowCols[0].appendChild(dom);
        });
    }

    function createDOM(item) {
        const {link, src, height, title} = item;

        // 创建a标签
        const a = document.createElement('a');
        a.href = link;
        // 创建img标签
        const img = document.createElement('img');
        img.src = './images/load.gif';
        img.setAttribute('height', height);
        img.setAttribute('img-src', src);
        // 创建p标签
        const p = document.createElement('p');
        p.innerHTML = title;
        p.className = title;
        // 将img p元素 分别追加到a 元素内
        a.appendChild(img);
        a.appendChild(p);
        return a;
    }

    // 图片懒加载
    function lazyLoad() {
        // 获取页面卷去的高度
        const sTop = win('scrollTop');
        // 获取浏览器一屏的高度
        const winH = win('clientHeight');
        for (let i = 0; i < imgAll.length; i++) {
            // 获取每张图片的offsetTop offsetHeight
            const image = imgAll[i];
            if (image.load) continue;
            const top = offset(image).top;
            const height = image.offsetHeight;
            if(sTop + winH >= top + height) {
                const src = image.getAttribute('img-src');
                let tempImg = new Image();
                tempImg.src = src;
                tempImg.onload = function () {
                    image.src = this.src;
                    // 标记图片已经加载 
                    image.load = true;
                    tempImg = null;
                }
            }
        }
    }
    // 加载更多
    function loadMore() {
        // 纵向滚动条滚动的距离
        const sTop = win('scrollTop');
        // 整个页面的高度
        const sHeight = win('scrollHeight');
        // 可视窗口高度
        const winH = win('clientHeight');
        if(sTop + winH >= sHeight - 100) {
            imgData();
        }
    }

    // 初始图片数据
    imgData();
    lazyLoad();
    window.onscroll = function () {
        loadMore();
        lazyLoad();
    }
}()