/*
* 目标：
*   1. 封装发布订阅
*
* */

(function (win) {
  class Subscribe {
    constructor() {
      // 将事件池(计划表)挂载到实例上面
      this.pond = [];
    }
    includes(fn) {
      return this.pond.includes(fn);
    }
    add(fn) {
      // includes(某一项) 方法用于判断某一项是不是被包含在数组中；这个方法字符串也可以调用，表示字符是否被包含在字符串中；如果包含返回true 否则返回false
      let isExist = this.includes(fn);
      !isExist ? this.pond.push(fn) : void 0; // void 用于产生undefined，表示什么也不做；
      return this;

    }
    remove(fn) {
      if (!this.includes(fn)) return;
      // 从事件池(计划表)中把之前订阅的方法移除掉
      this.pond = this.pond.filter(item => {
        item !== fn
      });
    }
    fire(...arg) {
      this.pond.forEach((item) => item(...arg));
    }
  }
  win.Subscribe = Subscribe;
})(window);

// function f1() {
//   console.log(1);

// }

// function f2() {
//   console.log(2);

// }

// function f3() {
//   console.log(3);

// }

// let plan = new Subscribe();
// plan.add(f1).add(f2).add(f3);
// plan.add(f1);
// plan.add(f2);
// plan.add(f3);

// setTimeout(() => plan.fire(), 3000);