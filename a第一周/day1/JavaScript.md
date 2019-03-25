# JavaScript
## 前端认识：
- 光会html+css你只能算是一个网页设计
- 前端html+css+js+node.js（框架）
- 一个完整的页面应用
> html页面结构
> css表现
> js行为给页面增加动态效果
> 原生JS就是内功可以让我们页面更具生命力
- 前端的工作
> html5+原生APP（IOS 安卓）
> 微信公众号 小程序（水滴步步宝）
> 客户端 RN app
> pc 移动页面
> node.js后端
> 全栈工程师
+ HTML(超文本标记语言)

+ CSS(层叠样式表)

+ Javascript(动态脚本语言)

+ HTML + CSS + JS

+ HTML + CSS 静态页面

+ JS 实现用户互动 数据交互

+ JS 主要是运行在浏览器

+ node.js 一种运行环境 可以让我们JS运行服务端（后端能力）

+ 运行环境 浏览器 nodejs 

+ JS让页面具备一些动态功能
## JS是什么
- JS (JavaScript) 一门动态脚本语言 主要运行浏览器里 + node.js(服务端)
- JS让我们页面 有动态交互效果 其实就是有更好的 与用户互动
## JS里面我们要学习些什么
- ECMAScript(标准)简称ES (ES6 ES7 ES8) 制定了 JS中核心内容（语法 变量 数据类型 语句 关键字 保留字 运算符）
- 文档对象模型DOM(Document Object Model)：提供了一些属性和方法 
- 让我们操作html页面中的元素（html标签)
- 浏览器对象模型BOM(Browser Object Model)：提供了一些属性和方法 让我们操作浏览器
## JS学习视频
+ https://pan.baidu.com/s/15WJ5UcOSTpRVcyPCZ8ZS2g
## day1
### javascript 三大部分
- ECMAScript（标准）简称ES 规定了JS中核心内容（语法 变量 数据类型 语句 关键字 运算符等）
- DOM（文档对象模型）提供了一些属性和方法  
- 让我们能够操作页面中的html元素(document.getElementByID())
- BOM(浏览器对象模型)提供了一些属性和方法 让我们能够操作浏览器（window.open()）
### JS引入方式
- 外链式
``` 
<script src="test.js"></script>
```
- 内嵌式
``` 
<script type="text/javascript">
    alert("hello world!");
</script>
```
- 行内式
```
<h3 onclick="alert('hello world！')">你好</h3>
```
- JS的引入方式
> 1.外链式 页面js太多时 推荐使用 好维护
> 2.内嵌式 JS代码比较少时
> 3.行内式 不常用
- 注意：内嵌式和外链式不能混用 
- 错误写法:
```
<script src="test.js">
    alert("hello world!");
</script>
```
- 正确写法:
```
<script>
     alert("珠峰");
</script>
```
### JS为什么放在body中
> 按照传统的做法，所有script 元素都应该放在页面的head元素中，这种做法的目的就是把所有外部文件（包括 css 和JavaScript文件）的引用都放在相同的地方，可是，在文档的 head 元素中包含所有JavaScript文件，意味着必须等到全部JavaScript代码都被下载、解析和执行完成之后，才能开始呈现页面内容（浏览器在遇到body标记时才开始呈现内容）

> 对于那些需要很多JavaScript代码的页面来说，这无疑会导致浏览器在呈现页面时出现明显的延迟，而延迟期间的浏览器窗口中将是一片空白。为避免这个问题，现代web应用程序一般都把全部 JavaScript引用放在<body>元素中页面内容的后面。
```
<script>
        // 获取元素必须要等html元素解析完才行
        //    在js中 根据ID名 获取页面中元素（html标签）
        var doc = document.getElementById('box');
        Console.log(doc);
</script>
```
```
<style>
        .box {
            width: 100px;
            height: 100px;
            background-color: #ff3344;
        }
    </style>
    <div class="box" id="box">12328923</div>
    <!-- DOM就是通过js操作html标签 -->
    <script>
        // 获取元素必须要等html元素解析完才行
        //    在js中 根据ID名 获取页面中元素（html标签）
        var asc = document.getElementById('box');
        console.log(asc);
    </script>
    <!-- 
        JS引入方式
        注意的
        JS存放位置
     -->
```
### JS中的变量
- 变量：可变化的值 存储数据（值）
- 定义变量:
> var 变量名 = 值
- 关键字 在JS中有特殊意义的单词 我不能随便用
- 一个= 赋值的意思
- var n = 2019; 
> n 这个变量 存储的值就是2019
- text这个变量 存储的值就是下面这段话:
```
var text = '关键字 在JS中有特殊意义的单词 我不能随便用';
```
- alert("弹出框内容");
- 变量用来存储值和代表值
- 把变量n所存储的值作为弹框内容
```
alert(n); //alert(n) => alert(2019)
alert(text) //alert(text) => alert('关键字 在JS中有特殊意义的单词 我不能随便用')
```
+ js代码自上而下一行一行执行的
+ 创建一个变量叫title并且他存储的值是100
```
    var title = 100;
    // 把此时title这个变量 所储存的值 通过弹窗打印出来
    alert(title); //100
    // 变量的值是可以修改的
    // 将title变量存储的值 修改成2018
    title = 2018; 
    // 再次将title的值 打印出来
    alert(title);//2018
    title = 2019; 
    alert(title);//2019
```
-  常量 恒久不变的量 一旦被定义 就不能被修改
- const 也是关键字 用来创建常量的  const 常量名 = 值
```
    const hello = 'hello world!';
    alert(hello);
    hello = 2019;
```
- 变量就是用来存储值和代表值的 var num = 100;
- 定义变量 var 变量名 = 值（所要储存的值）
- 变量的值可以被修改
```
    var n = 1000;
    n = 100;
```

### JS中的输出方式
- js中的输出方式 就把js中的内容 输出显示到页面中
- 输出到页面中 DOM里面提供的方法
```
document.write('我是页面中的 内容')
```
- innerHTML 将内容输出到指定页面元素中
- innerText
- 将变量text存储的数据内容 输出到页面当中
- JS把内容直接放到body里面了
```
    document.write(text);
    document.write('<h1>JavaScript</h1>');
    document.write('<h1>JavaScript</h1>')
    document.write('<h2>JavaScript</h2>')
    document.write('<h3>JavaScript</h3>')
    document.write('<h4>JavaScript</h4>')
```
```
<body>
   <h3 id="title"></h3>
   <p id="c"></p>
  <script>
     //获取ID名为title的页面标签h3
    var a = document.getElementById('title');
     // 元素.innerHTML = 元素内容
    // 将内容输出显示到页面h3标签中
    // a.innerHTML = '我是页面中的 标题3'
    var text = '欢迎来到掘金！我们给你的102495553@qq.com邮箱发送了一封账号验证邮件，为了你的账号安全，请尽快验证。重新发送邮件'
     var c = document.getElementById('c')
     c.innerHTML = text
 </script>
 </body>
```
- innerHTML 和innerText作用一样
- 区别:
> innerText不能够识别标签内容
  innerHTML能够识别标签内容

- innerText将内容作当做普通文本 直接输出到页面元素中
``` 
    a.innerText = '<i>我是页面中的标题3434</i>';
    a.innerHTML = '<i>我是页面中的标题3434</i>';
```
- 页面中输出方式
```
    document.write('<h3>hello</h3>');将内容直接输出到body中,能够识别标签
```
- innerHTML/innerText将内容输出到指定元素标签内


- 弹窗输出 会阻塞浏览器渲染页面
```
    alert('弹窗内容');//普通提示框
    confirm('你确认要退出登录');//确认框
    prompt('你的名字是什么？');//输入框
```

- 控制台输出（通常进行JS代码调试）
- 控制台会显示出一些JS代码运行时错误信息
```
<body>
   <h3 id="title"></h3>
  <script>
    console.log('控制台输出');
    console.dir('')//在控制台输出更详细的内容
    var ele = document.getElementById('title');
    console.log(ele);
    console.dir(ele);
    var ele = 123;
    console.log(ele);
  </script>
```
### 命名规范
- var 变量名 = 值
- 1. 驼峰式命名法(小驼峰 大驼峰)
- 小驼峰命名法  第一个单词首字母小写 从第二个单词开始 首字母要大写
```var getContextId = 123;```
- 大驼峰每个单词首字母都要大写 (面向对象 定义类)
``` var GetElementById = 20;```
- 2.严格区分大小写
```
    var a = 100;
    var A = 200;
    console.log(a);
    console.log(A);
```
- 3.数字 字母,但是数字不能作为开头
```     
        var 1a = 100; //错误写法
        var c1 = 200;
        _ $ 可以作为开头
        var _c = 'c';//内置的自定义变量
        var $c = 'c';//jQuery类库中的元素
```
- 4.定义变量时 不能使用关键字 和 保留字(后面升级关键字)
``` var document const ```
### 数据类型 
- 规定JS中 值都可以有哪些
```
        var n = 123;
        var text = '数据类型';
        var str = '123';
        var str = "123";
        var s = '';//空字符串
        var s = "";
```
- 基本数据类型(原始数据类型)
> number 数字类型 例如 1 -1 0.25
  string 字符串类型 例如 '' ""
  Boolean 布尔类型 true 真 (对) false 假(错)
  Null null 空值 空指针对象
  undefined 未定义
  (Symbol ES6标准)
- 引用数据类型(复合数据类型)
 + 对象数据类型
    ``` 普通对象 object {}
        数组 Array[]
        正则 /\d+/
        date 日期对象 
        Math 数学对象   
        ...
    ```
      
 + 函数数据类型 function
 
### 检测数据类型
- typeof
- instanceof
- constructor
- Object.prototype.toString.call()
- typeof
- 语法
- typeof 值/变量
```
        //Number
        var n = 2019;
        console.log(typeof n);//"number" typeof n => typeof 2019
        console.log(typeof 1);//"number"
        // String
        console.log(typeof "你好"); //"String"
        // Boolean
        console.log(typeof true); //"Boolean"
        console.log(typeof false);//"Boolean"
        // Null
        console.log(typeof null); //"object" 空指针对象 先特殊记
        // undefined 
        console.log(typeof undefined);//"undefined"
        // 普通对象{}
        var obj = {id: 1};
        console.log(typeof obj); //"object"

        // 数组[]
        var arr = [1,2,3];
        console.log(typeof arr); //"object"
        //正则
        var reg = /\d+/;
        console.log(typeof reg); //"object"
```
- 缺陷 typeof 不能够具体细分 对象数据类型 是 数组 还是 正则
```
        // 函数
        function fe() {}
        console.log(typeof fe);//"function"
```
- typeof 通常用来检测基本数据类型和函数
- typeof的返回值都哪些
- "number" "string" "boolean" "undefined" "object" "function"





