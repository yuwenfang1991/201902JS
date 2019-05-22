/* 挂载到window上 */
window._cookies = (() => {
    /**
     * 
     * @param {*} key 
     * @param {*} value 
     */
    function setCookie(key, value) {
        // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
        document.cookie = `${key}=${encodeURIComponent(value)}`;
    }
})()