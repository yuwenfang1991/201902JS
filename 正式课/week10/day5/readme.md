## Vue 有自己的脚手架 vue-cli(2.0版本) @vue/cli(3.0版本)

+ 用之前 需要在全局安装一下
    - npm &nbsp; i &nbsp; @vue/cli &nbsp; -g &nbsp; 或者 yarn &nbsp; add &nbsp; @vue/cli &nbsp;  global
+ 使用 vue &nbsp; -V 来检测是否安装成功  出现版本号 代表安装成功
+ 一台电脑只要安装一次就够了
+ 若安装成功之后 我们就可以使用了

+ 切到你自己对应的文件夹 运行cmd命令窗口 打开命令窗口
vue &nbsp; create &nbsp; 自己的项目名称

+ 以上是新建项目的过程，工作时，一般是维护老项目
+ 维护时 我们要做的过程
    - 1、克隆远程项目到本地
    - 2、进入项目，运行npm i 或者 yarn 去下载安装左右的项目依赖
    - 3、依赖安装完成之后 一般都是 npm run dev 或者 npm run serve，具体需要看 package.json 中的script项
+ **** 若项目是使用yarn安装的依赖 就一直用yarn
+ 若是npm安装 就一直用npm 两者不能混用 会互相删除各自的某些依赖


