~(function () {
    // 导入依赖 工具方法
    const { toJSON, likeAryTo, win, offset } = window._utils;

    // 获取操作元素 [li, li, li, li]
    const cols = document.querySelectorAll("#flow>li");
    // 将元素集合转换成数组(sort)
    // const flowCols = likeAryTo(cols)
    const flowCols = Array.from(cols)

    // 获取页面中所有图片
    const imgAll = document.getElementsByTagName('img')

    // 获取图片数据
    function getImgData() {
        // 1.创建ajax实例
        const xhr = new XMLHttpRequest();
        // 2.配置请求方式 请求地址 是否同异步
        xhr.open("GET", "json/data.json", false);
        // 3.监听数据响应
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                // 动态创建
                renderDOM(toJSON(this.responseText))
            }
        };
        // 4.发送ajax请求
        xhr.send();
    }

    // 数据绑定 - 动态创建（createElement）
    function renderDOM(data) {
        data.forEach(item => {
            // 动态创建DOM
            const dom = createDOM(item)

            // 对列进行排序
            flowCols.sort((a, b) => a.offsetHeight - b.offsetHeight)
            flowCols[0].appendChild(dom)
        })
    }

    // 根据每条图片数据 生成DOM
    function createDOM(item) {
        const { link, src, title, height } = item
        // 创建a标签
        const a = document.createElement('a')
        a.href = link

        // 创建img标签
        const img = document.createElement('img')
        // 最开始显示 默认图片
        img.src = './images/load.gif'
        img.setAttribute('height', height)

        // 真实图片地址 保存到元素自身标签属性上img-src
        img.setAttribute('img-src', src)

        // 创建p标签
        const p = document.createElement('p')
        p.innerHTML = title
        p.className = 'title'

        // 将img p元素 分别追加到a元素内
        a.appendChild(img)
        a.appendChild(p)
        return a
    }

    // scrollHeight === clientHeight + scrollTop（最大值）

    // 图片懒加载
    function lazyImg() {
        // 如何判断图片出现在可视区域
        // sTop + winH >= offsetTop + offsetHeight
        const sTop = win('scrollTop')
        const winH = win('clientHeight')

        for (let i = 0; i < imgAll.length; i++) {
            // 获取每张图片的offsetTop offsetHeight
            const img = imgAll[i]

            // 避免重复加载
            if (img.loaded) continue;

            const top = offset(img).top // {left, top}
            const height = img.offsetHeight
            if (sTop + winH >= top + height) {
                const src = img.getAttribute('img-src')

                // img.src = src 图片地址有可能是无效的
                // 为了保证图片有效性
                let tempImg = new Image()
                tempImg.src = src

                // 图片加载成功事件
                tempImg.onload = function () {
                    console.log('load')
                    img.src = this.src

                    // 标记图片已经加载
                    img.loaded = true

                    tempImg = null
                }
                // 图片加载失败事件
                tempImg.onerror = function () {
                    console.log('图片地址无效的', this.src)
                }
            }
        }
    }

    // 加载更多
    function loadMore() {
        // 纵向滚动条件 滚动距离
        const sTop = win('scrollTop')
        // 整个页面高度（clientHeight + 溢出内容（sTop最大值））
        const sHeight = win('scrollHeight')
        // 当前可视窗口一屏的高度（浏览器窗口高度）
        const winH = win('clientHeight')

        // 函数节流和防抖 优化频繁调用
        // 快要到达底部 加载更多数据
        if (winH + sTop >= sHeight - 200) {
            console.log('快要到达底部')
            getImgData()
        }
    }

    // 请求初始数据
    getImgData();
    // 懒加载初始数据
    lazyImg()

    // 监听滚动条滚动事件
    window.onscroll = function () {
        loadMore()
        lazyImg()
    }

})();


    // let timer = null
    // JS函数节流和防抖
    // window.onscroll = function() {
    //   timer && clearTimeout(timer)
    //   timer = setTimeout(() => {
    //     loadMore()
    //   }, 300)
    // }

    // => ajax请求数据
    // => render(data)
    // => data.forEach(item)
    // => createHtml(item)
    // => htmlStr 
