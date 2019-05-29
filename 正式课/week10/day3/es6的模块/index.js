// import qqq from './a.js' // 从a 文件中 引入str
// console.log(qqq);
import * as qqq from './a.js' // 把 a.js 的所有导出 作为变量 qqq 也就是我们可以通过qqq 去使用所有的导出
console.log(qqq.d());

