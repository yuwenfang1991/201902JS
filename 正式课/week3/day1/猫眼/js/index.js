; (function () {
    // 请求地址
    const url = 'https://www.easy-mock.com/mock/5b1e1a71d4a14a3247a6cdb9/moveList';

    // 元素容器
    let content2 = document.getElementById('content2');
    // 票房数据的容器
    let ratingList = [];
    // 排序的字段
    //  boxInfo实时票房,boxRate票房占比,showRate排片占比,avgSeatView上座率
    let sortAttr = ['boxInfo','boxRate','showRate','avgSeatView'];
    // 获取初始数据
    function request(url) {

        // ajax请求数据
        let xhr = new XMLHttpRequest();

        // 调用xhr 的open方法
        xhr.open('GET', url, false);
        // 监听请求响应
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                // 如果满足这个条件,就表示当前请求顺利完成
                // responseText 获取字符串形式的数据
                const { data: { list } } = _utils.toJSON(this.responseText);
                ratingList = list;
            }
        }
        // 发送ajax请求
        xhr.send(null);
    }

    // 专门用来渲染列表数据
    function rendList(ele, list) {
        let str = ``;
        list.forEach(item => {
            const {
                movieName,// 电影名称
                releaseInfo, // 上映天数
                sumBoxInfo,
                boxInfo, // 实时票房
                boxRate,//票房占比
                showRate, // 排片占比 
                avgSeatView, // 上座率
            } = item;
            str += `
            <ul id="contentList">
                <li class="c1">
                    <h3>${movieName}</h3>
                    <em>${releaseInfo}</em>
                    <em>${sumBoxInfo}</em>

                </li>
                <li class="c2">
                    <span>${boxInfo}</span>
                </li>
                <li class="c3">
                    <span>${boxRate}</span>
                </li>
                <li class="c4">
                    <span>${showRate}</span>
                </li>
                <li class="c5">
                    <span>${avgSeatView}</span>
                </li>
            </ul>
        `;
        });
        ele.innerHTML = str;
    }

    // 给排序按钮绑定点击事件
    function binEvent() {
        const btnSorts = document.querySelectorAll('.content-top>.sort-btn');
        for(let i = 0; i < btnSorts.length; i++) {
            btnSorts[i].flag = -1;
            btnSorts[i].onclick = function () {
                this.flag *= -1;
                const sid = this.getAttribute('sort-id');   
                // 排序的字段 sortAttr[sid]
                sortList(sortAttr[sid],this.flag);
            }
        }
    }
    // 负责对数据进行排序
    function sortList(attr,flag) {
        ratingList.sort((a, b) => {
            let p1 = parseFloat(a[attr]);
            let p2 = parseFloat(b[attr]);
            // 如果是 NaN 就让 p1 = 0, p2 = 0;
            isNaN(p1) && (p1 = 0);
            isNaN(p2) && (p2 = 0);
            // 相当于
            // if(isNaN(p1)) {
            //     p1 = 0;
            // } else if(isNaN(p2)) {
            //     p2 = 0;
            // }
            return(p1 - p2) * flag; 
        });
        // 数据排序后 重新渲染页面
        rendList(content2,ratingList);
    }
    // 排序按钮事件绑定
    binEvent();
    // 获取初始数据
    request(url);
    // 渲染初始数据列表
    rendList(content2,ratingList);
})()



