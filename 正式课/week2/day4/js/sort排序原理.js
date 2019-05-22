var ary = [1,3,2,5,10,8,6];
console.log(ary);
ary.sort((a, b)=>{
    // chrome最新版浏览器已经更换排序算法,下述内容作为了解
    // a 数组当前项
    // b 当前项的下一项
    // return a - b 如果a - b > 0 说明a大于b,此时让a b两项交换位置,否则就是什么也不做
    // return b - a 如果b - a > 0, 说明 b大于 a,此时a,b交换位置,大的在前面,所以就是降序
    console.log(a,b);
})