; (function () {
    // 请求地址
    const url = 'https://www.easy-mock.com/mock/5cd4edc7e393cf7606e9d2f4/nba/promovie/api/box/second.json';

    let listData = null;
    // 元素容器
    let content2 = document.getElementById('content2');
    // 排序的字段
    //  boxInfo实时票房,boxRate票房占比,showRate排片占比,avgSeatView上座率
    let sortAttr = ['boxInfo', 'boxRate', 'showRate', 'avgSeatView'];
    // 获取初始数据
    function request(url) {
        axios({
            method: 'post',
            url: url
        }).then((data) => {
            console.log(data);
            
            listData = data.data.data.list;
            // 渲染初始数据列表
            rendList(content2, listData);
        }).catch((err) => {
            console.warn(err);

        })

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
                avgSeatView // 上座率
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
        for (let i = 0; i < btnSorts.length; i++) {
            btnSorts[i].flag = -1;
            btnSorts[i].onclick = function () {
                // console.log(this.flag);
                this.flag *= -1;
                const sid = this.getAttribute('sort-id');
                // 排序的字段 sortAttr[sid]
                sortList(sortAttr[sid], this.flag);
            }
        }
    }
    // 负责对数据进行排序
    function sortList(attr, flag) {
        listData.sort((a, b) => {
            
            let p1 = parseFloat(a[attr]);
            let p2 = parseFloat(b[attr]);
            isNaN(p1) && (p1 = 0);
            isNaN(p2) && (p2 = 0);
            return (p1 - p2) * flag;
        });
        // 数据排序后 重新渲染页面
        rendList(content2, listData);
    }
    // 获取初始数据
    request(url);
    
    // 排序按钮事件绑定
    binEvent();

})()



