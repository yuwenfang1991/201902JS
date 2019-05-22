~function () {
    // 导入依赖
    const { toJSON,win,css } = window._utils;
    let flowBox = document.getElementById('flowBox');
    let cols = flowBox.getElementsByTagName('li');
    let imgAll = document.getElementsByTagName('img');
    let btn = document.getElementById('btn');
    let flowArr = Array.from(cols);
    // 获取数据
    function imageData() {
        let xhr = new XMLHttpRequest();
        
        // 调用open方法
        xhr.open('GET','json/data.json',false);
        // 监听事件
        xhr.onreadystatechange = function() {
            if(this.readyState = 4 && /^2\d{2}$/.test(this.status)) {
                render(toJSON(this.responseText));
            }
        }
        xhr.send(null);
    
    }
    // 排序
    function render(data) {
        data.forEach(item => {
            let dom = createDOM(item);
            flowArr.sort((a, b)=> a.offsetHeight - b.offsetHeight);
            flowArr[0].appendChild(dom);
            // console.log(flowArr[0]);
            
        });
    }
    // 动态创建
    function createDOM(item) {
        let {link, src, height, title} = item;
        // 创建 a标签
        let a = document.createElement('a');
        a.href = link;
        // 创建img标签
        let img = document.createElement('img');
        img.src = 'images/load.gif';
        img.setAttribute('height',height);
        img.setAttribute('img-src',src);
        // 创建p标签
        let p = document.createElement('p');
        p.innerHTML = title;
        p.className = 'title';
        // 将 img 和  p标签插入到 a 标签中
        a.appendChild(img);
        a.appendChild(p);
        return a;
    }
    // 懒加载
    function lazyLoad() {
        // 获取滚动条卷去的高度
        let sTop = win('scrollTop');
        let winH = win('clientHeight');
        for (let i = 0; i < imgAll.length; i++) {
            const img = imgAll[i];
            if(img.load) continue;
            const top = img.offsetTop;
            const height = img.offsetHeight;
            if (sTop + winH >= top + height) {
                let tempImg = img.getAttribute('img-src');
                img.src = tempImg;
                tempImg.onload = function () {
                    img.src = src;
                    img.load = true;
                    tempImg = null;
                }
                
            }
            
            
        }
        
    }


    // 加载 更多
    function loadMore() {
        // 获取滚动条卷去的高度
        let sTop = win('scrollTop');
        let winH = win('clientHeight');
        let sHeight = win('scrollHeight');
        if(sTop + winH >= sHeight - 100) {
            imageData();
        }
    }

    // 回到顶部
    function backTop() {
        const tep = 20;
        const target  = 0;
       
        btn.onclick = function () {
            
            this.timer && clearInterval(this.timer)
            this.timer = setInterval(() => {
                let sTop = win('scrollTop');
                sTop -= tep;
                
                
                if (sTop <= target) {
                    console.log(sTop);
                    win('scrollTop', target);
                    clearInterval(this.timer);
                    return;
                }
                win('scrollTop',sTop);
            }, 20);
        }
    }

    imageData();
    lazyLoad();
    window.onscroll = function () {  
        const sTop = win('scrollTop');
        const sHeight = win('scrollHeight');
        loadMore();
        lazyLoad();
        if (sTop >= sHeight / 2) {
            btn.style.display = 'block';
        }
    }
    backTop();
}()