/*
* 目标：
*   1. 理解鼠标丢失原因
*   2. 解决鼠标丢失问题
* */
/**
 * 鼠标丢失的原因:
 *   当鼠标移动的时候,因为浏览器计算盒子应该出现的位置是需要一定的时间的。如果当你在这一段时间内再次移动鼠标,因为上一次mousemove时盒子位置还没有计算完,所以也没办法设置到上一次应该出现的位置,这是鼠标就把元素丢了。丢失元素后再移动鼠标,也就没办法触发盒子的mousemove事件了,所以盒子也就没办法跟随鼠标了;
 *   丢失元素后再抬起鼠标左键,触发的也不是这个盒子的mouseup事件,所以盒子的跟随鼠标移动的能力即mousemove事件没能被移除。这就导致当鼠标再次回到盒子上时,盒子还能跟着鼠标移动
 */
/**
/**
 * 解决方案:
 *   1. 将元素和鼠标绑定在一起 setCapture(), 当拖拽结束后再绑解绑releaseCapture() 【chrome浏览器不兼容, IE和 Firefox可以用】
 *  2. 因为不管鼠标怎么移动,都不会出了浏览器页面,所以我们就把元素的mousemove和 mouseup事件绑定给 document（采用事件委托的思路思路解决问题）
 */
/**
 * 需求: 页面当中的盒子dragObj, 我们需要它有拖拽的功能.具体: 
 *  1. 点击这个盒子,鼠标左键不松开
 *  2. 按中鼠标左键不松开移动鼠标,盒子要跟着鼠标移动;
 *  3. 当我拖到目的地(我想停止拖拽的地方)松开鼠标左键,盒子就要停在松开鼠标的位置;
 *  4. 当我松开鼠标后,无论我怎么移动鼠标,盒子都不能跟着移动 
 */
/**
 * 原理: 我们先分析需求中拖拽阶段,发现一共分为三个阶段:
 *  1. 鼠标按下时赋予这个盒子可以被拖动的能力;
 *  2. 拖动其实就是鼠标移动,盒子跟随;即在mousemove事件中,实现鼠标跟随;
 *  3. 松开鼠标左键,移除盒子能够被拖动的能力
 * 综上,在鼠标按下时即mousedown事件触发时,给元素绑定mousemove事件,在mousemove事件函数中实现鼠标跟随。最后鼠标抬起mouseup事件触发,在mouseup的事件函数中取消可以被拖动的能力(在mouseup时 移除mousemove事件)
 */
const dragObj = document.getElementById('dragObj');
dragObj.onmousedown = dragStart; // 监听鼠标按下事件,赋予拖动能力
// 把mouseup事件委托给 document 但是这样做会有一个问题,dragMove函数中的 this就变成了 document, 事实上我们希望this是我们拖动的盒子
function dragStart(e) {
    // this.setCapture(); chrome 不兼容
    // 开始拖拽
    // 1. 记录盒子的初始的位置、鼠标按下时鼠标的位置
    this.startX = e.pageX; // 鼠标按下时鼠标的X轴坐标
    this.startY = e.pageY; // 鼠标按下时鼠标Y轴坐标
    // !!! xxx.style.xxx 这种方式只能获取写在HTML行内样式
    this.DRAGM = dragMove.bind(this);
    this.DRAGE = dragEnd.bind(this);
    this.startL = parseFloat(this.style.left); // 获取盒子初始的left值
    this.startT = parseFloat(this.style.top); // 获取盒子初始的top值
    // 将mousemove委托给 document
    document.addEventListener('mousemove', this.DRAGM, false);
    document.addEventListener('mouseup', this.DRAGE, false); // 监听鼠标抬起事件,移除拖动能力
}

function dragMove(e) {
    // 拖动
    // 1. 拖动的过程中实时计算鼠标相对于初始位置移动了多少
    let moveX = e.pageX - this.startX;
    let moveY = e.pageY - this.startY;
    // 2. 计算盒子应该出现的位置
    let curL = this.startL + moveX;
    let curT = this.startT + moveY;
    // console.log();

    // 3. 将这个盒子的left值 和 top值 分别设置成它应该出现的位置
    this.style.left = curL + 'px';
    this.style.top = `${curT}px`;

}

function dragEnd(e) {
    // this.releaseCapture(); Chrome 不兼容此方法
    // 结束拖拽
    document.removeEventListener('mousemove', this.DRAGM, false); // 取消了mousemove事件,拖动能力随之被取消
}
