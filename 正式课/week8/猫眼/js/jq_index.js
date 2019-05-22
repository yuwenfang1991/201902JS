~ function ($) {
    const url = 'https://www.easy-mock.com/mock/5cd4edc7e393cf7606e9d2f4/nba/promovie/api/box/second.json';
    // 元素容器
    let $content2 = $('#content2');
    // 排序的字段
    let sortAttr = ['boxInfo', 'boxRate', 'showRate', 'avgSeatView'];
    let listData = null;
    // 获取初始数据
    function request(url) {
        new Promise(function (res, rej) {
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                success: res,
                error: rej
            })
        }).then((data) => {
            listData = data.data.list;
            rendList($content2, listData);
        }).catch((err) => {
            console.log(err);
        });

    }

    function rendList(ele, list) {
        let str = '';
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
        ele.html(str);
        // console.log(listData);

    }

    function bindEvent() {
        const $btnSorts = $('.content-top>.sort-btn');
        let flag = -1;
        $btnSorts.on('click', function () {
            console.log(this);
                flag *= -1;
            console.log(flag);

            const $sid = $(this).attr('sort-id');

            // 排序的字段 sortAttr[sid]
            sortList(sortAttr[$sid], flag);
        })
    }
    // 对数据进行排序
    function sortList(attr, flag) {
        listData.sort((a, b) => {
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
            return (p1 - p2) * flag;
        });
        // 数据排序后 重新渲染页面
        rendList($content2, listData);
    }

    bindEvent()
    request(url);
}(jQuery)