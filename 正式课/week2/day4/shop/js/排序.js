// 获取要操作的元素
let header = document.getElementById('header');
let headerBox = header.getElementsByTagName('a');
let list = document.getElementById('list');
let productList = list.getElementsByTagName('li');
// console.log(headerBox,productList);
// console.log(headerBox,productList);
// 基于价格给productList 里面的li排序 
// let flag = -1; // 定义一个flag,在1和-1之间来回切换
// => 现在有一个bug,第一次我点击了上架时间,上架时间按照升序排列了(全局变量flag变成了1),接下来我点击 价格,此时应该按照价格升序排，但是flag此时是1,点击过后变成-1，所以结果就是按照价格降序排列。原因是三个 a标签修改的是同一个 flag，造成了排序混乱，所以我们采用自定义属性的方式让每个 a 标签私有一个flag
let sortList = function (that,index) {
    // let innerText = that.innerText;
    // 用来处理排序逻辑的方法
    // 1.根据getElementsByTagName获取的是一个元素集合，而元素集合是一个类数组,如果想调用sort进行排序,需要先将类数组转化成数组,数组中的li并不是克隆出来的,而是原有类数组中元素对象对应的堆内存空间地址
    // let productArr = [].slice.call(productList);
    let productArr = [...productList];
    // console.log(productArr);需要按照上架时间、热度排序;但是因为不管点击哪个a标签
    // 2.基于sort按照价格给 li排序
    // => 我们现在需要按照上架时间、热度排序;但是因为不管点击哪个a标签,都会执行sortList方法,但是sortList 方法却不知道你点击的是哪个a标签。但是事件函数中的 this 就是当前被点击的a标签。我们需要通过某种方式，让sortList也知道点击的是谁。
    let aInn, bInn;
    productArr.sort((a, b) => {
        // a 和 b 都是li元素对象,所以不能直接相减
        // 我们需要从li上面获取到价格
/*         switch (innerText) {
            case '上架时间':
                aInn = a.getAttribute('data-time');
                bInn = b.getAttribute('data-time');
                break;
            case '价格':
                aInn = a.getAttribute('data-price');
                bInn = b.getAttribute('data-price');
                break;
            case '热度':
                aInn = a.getAttribute('data-hot');
                bInn = b.getAttribute('data-hot');
                break;
        } */
        // 简化
        let ary = ['data-time', 'data-price', 'data-hot'];
        aInn = a.getAttribute(ary[index]);
        bInn = b.getAttribute(ary[index]);
        let reg = /-/g;    
        if (index === 0) {
            // 因为时间这个字符串含有 - 所以相减得到NaN, 导致不能排序,所以需要把时间字符串中的 - 干掉
            // 如果点击的是上架时间,我们需要把日期中划线(-)去掉
            aInn = aInn.replace(reg, '');
            bInn = bInn.replace(reg, '');
        }
        // console.log(aInn - bInn);
        return (aInn - bInn) * that.flag;
        // 排序时使用当前被点击的a 标签私有的 flag
        // 如果想实现倒序,这里就需要 return bInn - aInn(降序)
        // 但是下次再点击的时候,还需要变成 return aInn - bInn(升序)
        // ...
        // 所以升序降序切换的关键是 sort内部的小函数的返回值在 aInn - bInn 和 bInn - aInn 之间来回切换。
        // 怎么让 aInn - bInn 和 bInn - aInn 之间切换？
        // 我们发现(aInn - bInn) * -1 => bInn - aInn
        // (bInn - aInn) * -1 => aInn - bInn
        // 所以我们发现只要给(aInn - bInn)不断乘以-1，就可以实现在(aInn - bInn) 和 (bInn - aInn)来回切换
    });
    // console.log(productArr);
    // 3.productArr 排好序后页面中没有按照价格排列,原因是我们还需要把排好序的li 依次插入到ul#list(id为 list 的ul)中
    for (let j = 0; j < productArr.length; j++) {
        // appendChild向元素末尾追加元素,但是页面中还是10个不是20个,只是原来的10个顺序发生了了变更.为啥？
        list.appendChild(productArr[j]);
    }
}
// 循环绑定点击事件
for (let k = 0; k < headerBox.length; k++) {
    headerBox[k].flag = -1; //让每个a标签私有自己的 flag, 并且在排序时自己管理自己的
    // 回滚:将代码回退到上一个版本
    headerBox[k].onclick = function () {
        // 让flag在-1 和 1 之间来回切换，就能实现升降序的来回切换
        // =>如果你点击某一个a标签的时候，想让列表按照当前维度升序排序,就要保证当前 a 标签的flag是-1;所以我们点击当前a标签的时候，把其他两个a 标签的flag重置成-1；
        for (let l = 0; l < headerBox.length; l++) {
            if(headerBox[l] !== this) {
                headerBox[l].flag = -1;
            }
        }
        this.flag *= -1;
        // 点击价格的时候给li排序
        sortList(this,k);
    }
}

/* 
 * DOM映射；页面中中的HTML 元素和我们通过js相关方法(getElementsByTagName/getElementById/getElementsByxxxx)获取元素集合或者是对象存在映射关系。(已改了另一个跟着改)
  * list[i].style.backgroundColor = 'red':将；list[i]元素对象对应的堆内存空间下的style  属性下的backgroundColor 属性修改为red(本质是操作了js的堆内存空间),但是由于DOM映射机制,页面中的元素和元素对象的堆内存地址是绑在一起。所以我们修改了元素对象堆内存空间里面的值,页面中的标签会按照最新的值来渲染。
  * 数据绑定之前我们获取 ul 下面的li得到一个空集合,但是在数据绑定之后，我们不需要重新获取,DOM 映射机制会把新增的元素映射到我们之前获取集合中，此时元素集合不再是空集合
  *  但是querySelectorAll/querySelector获取的集合叫做静态集合【staticNodeList】,而且是掐断了DOM映射的,基于这种方式获取的元素集合,在数据绑定完成后需要重新获取。
  * productList 是 ul 下面的li集合,集合中存储的是元素对象的堆内存地址;
  * {0:xxxfff000,1:xxxfff111,2:xxxfff222,...,length:10}.后来我们把productList转换成数组,在这个过程中只是把每个li元素对象的堆内存地址复制到了数组中[xxxfff000,xxxfff111,xxxfff222...]
  * 然后我们appendChild时，就是把appendChild(xxxfff000【堆内存地址】),此时appendChild发现 xxxfff000这个堆内存空间在页面中有对应的li,所以它不会克隆一个新的,而是把那个对应的li移动到容器末尾
  * appendChild:是向容器的末尾追加元素,如果追加的元素已经存在于之前的容器中了,此时并不会克隆(按照原来的,再造一份一模一样的新的)一份再追加,而是把原来的移动到容器的末尾.
*/