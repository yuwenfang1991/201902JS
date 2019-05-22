 // 创建一个组件类 Tab
    function Tab(options) {
      
    // 如果当前this 是Tab实例 说明是通过new操作符来调用的
    if (!(this instanceof Tab)) { // 没有new就报警告
      return console.warn('Tab is a constructor and should be called with the `new` keyword')
    }

    // 如果不传参数对象 或者没有el属性 直接警告⚠️
    if (!options || !options.el) {
      return console.warn('缺少el属性')
    }

    // 初始化函数 （引线 导火索)
    this._init(options)
   
  }

  Tab.prototype._init = function (options) {
    // 将参数对象保存到 实例的自身
    this._options = options;
    // 获取操作元素
    this._querySelector()

    // 绑定点击事件
    this._bindEvent()
  }

  // 原型上的方法 就供所属类的实例来使用
  // 获取操作元素  this => 当前Tab实例
  Tab.prototype._querySelector = function () {
    // 根据ID名 获取最外层容器 div#Tab1
    const ele = document.querySelector(this._options.el);
    
    // 根据ele 获取里面的li元素[li, li, li] 并且保存到实例自身
    this.headerList = ele.querySelectorAll('.header>li')

  }

  // 清空类名
  Tab.prototype._clearClass = function () {
    const headerList = this.headerList
   
    for (let i = 0; i < headerList.length; i++) {
      headerList[i].className = ''
      
    }
  }

  // 添加类名
  Tab.prototype._addClass = function (n) {
    this.headerList[n].className = 'active'
   
  }

  // 循环绑定点击事件 this => 当前Tab实例
  Tab.prototype._bindEvent = function () {
    const headerList = this.headerList

    for (let i = 0; i < headerList.length; i++) {
      // 箭头函数中没有this 它使用所在作用域中的this
      headerList[i].onclick = () => {
        // 清空元素类名
        this._clearClass()

        // 给元素添加类名
        this._addClass(i)
      }
    }
  }

  new Tab({
    el: '#tab1' // el 容器元素的ID名
  })

  new Tab({
    el: '#tab2' // el 容器元素的ID名
  })