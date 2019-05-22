/**
 * ajax({url,type,data,async,cache}).then(()={},()=>{})
 * 封装ajax四步得有; 能调用.then 则返回值必是一个Promise实例
 */

function ajax(options) {
    let {
        url, // url 是路径
        type = 'GET', // 请求类型
        data = {}, // 发给后台的数据
        async = true, // 是否同异步
        cache = false, // 是否走缓存
    } = options;

    // 对于data 的处理
    let str = '';
    if (typeof data === "object") {
        for (const k in data) {
            if (data.hasOwnProperty(k)) {
                str += `${k}=${data[k]}&`;
                // console.log(data[k]);
                
            }
        }
        str = str.substring(0, str.length - 1); // 删除最后边的 &
    } else {
        str += data;
    }

    if (type.toLowerCase() === 'get') {
        // str 拼接到 url 后边
        if (url.includes('?')) {
            url = url + '&' + str;
        } else {
            url = url + '?' + str;
        }
        // 判断是否走缓存 只有get 才需要判断是否走缓存
        if (!cache) {
            url += '&_=' + Math.random();
        }
    }
    let p = new Promise(function (res, rej) {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url, async);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) { // 4 代表请求完成, 成功或者失败 需要看 status
                if (/2\d{2}|304/.test(this.status)) {
                    let str = xhr.response; // 后台给的JSON 字符串
                    // let obj = JSON.parse(str);
                    let obj = null;
                    try {
                        obj = JSON.parse(str);
                    } catch (error) {
                        obj = xhr;
                    }

                    res(obj);

                } else if (/[45]\d{2}/.test(xhr.status)) {
                    rej(xhr);
                }
            }
        }
        // post 请求 需要把参数放到send
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset = utf-8');
        // 这个请求头的设置 只是针对 post 请求来说的, 对于get来说没有作用
        xhr.send(str);
    });

    return p;
}