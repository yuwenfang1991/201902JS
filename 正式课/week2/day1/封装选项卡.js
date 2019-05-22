class Tab {
    constructor(options) {
        if (!(this instanceof Tab)) {
            return console.warn('Tab is a constructor and should be called with the `new` keyword');
        }

        if (!options || !options.el) {
            return console.warn('缺少el属性');
        }

        this._init(options);
    }

    _init(options) {
        this._options = options;
        this._querySelector();
        this._bindEvent();
    }

    _querySelector() {
        const ele = document.querySelector(this._options.el);

        this.headerList = ele.querySelectorAll('.header>li');

        this.panelList = ele.querySelectorAll('.panel>div');
    }

    _clearClass() {
        const headerList = this.headerList;
        const panelList = this.panelList;
        for (let i = 0; i < headerList.length; i++) {
            headerList[i].className = '';
            panelList[i].className = '';
        }
    }

    _addClass(n) {
        this.headerList[n].className = 'active';
        this.panelList[n].className = 'active';
    }

    _bindEvent() {
        const headerList = this.headerList;
        for (let i = 0; i < headerList.length; i++) {
            headerList[i].onclick = () => {
                // 清空元素类名
                this._clearClass();
                // 给元素添加类名
                this._addClass(i);
            }
        }
    }

}