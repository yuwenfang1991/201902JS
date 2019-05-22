/*
* 目标：
*   1. 理解水平弹性势能动画原理；
*   2. 理解计算水平速度原理
*   3. 理解停止动画条件
*   4. 实现水平动画
* */
/**
 * 需求: 在拖拽结束之后,盒子要做弹性势能动画。并且我们出手的速度越快,盒子运动的水平方向上运动的次数越多。并且当运动到浏览器边界时要反弹回来。垂直方向上,如果运动到底部,也需要弹起来,然后还会落下,往复若干次最终停止在浏览器底部 
 */
/**
 * 分析：抛物线运动是由两个方向的运动合成的: 水平方向弹性势能往复运动；垂直方向的往复运动；所以我们需要分两种动画实现，然后拖拽结束后同时开启这两个动画；即可实现抛物线运动。
 * 水平方向上：
 *  1. 计算盒子在拖拽结束后的出手速度；
 *  2. 在运动的过程当中,判断是否越界(不能超出浏览器的可视区域)
 *  3. 到达边界以后,让速度变成相反的方向(给速度乘以-1)
 *  4. 动画是一个速度衰减的过程(给速度乘以一个小于1的数，如0.98)
 *  5. 清除动画的时机：因为速度不断乘以一个小于1的数会不断变小，小到给盒子带来的动画肉眼不可见的时候就要清除动画；
 */
/**
 *  1. 计算初速度：在盒子被拖动的过程中，浏览器的mousemove事件触发事件是 固定的。而速度是单位时间内走过的距离,我们现在把两次mousemove事件触发中间这段事件作为单位时间,求初速度的问题就转化成计算两次鼠标之间的距离。
 *  2.  
 */
let dragObj = document.getElementById('dragObj');

dragObj.onmousedown = dragStart;// 监听鼠标按下事件，赋予拖动能力

function dragStart(e) {
    // this.setCapture();chrome不兼容

    // 开始拖拽
    // 1. 记录盒子初始位置、鼠标按下时鼠标的位置
    this.startX = e.pageX; // 鼠标按下时鼠标的x轴坐标
    this.startY = e.pageY; // 鼠标按下时鼠标的y轴坐标

    // !!! xxx.style.xxx 这种方式只能获取写在html行内的样式；
    this.startL = parseFloat(this.style.left); // 获取盒子初始的left值
    this.startT = parseFloat(this.style.top); // 获取盒子的初始top值
    this.DRAGM = dragMove.bind(this);
    this.DRAGE = dragEnd.bind(this);
    document.addEventListener('mousemove', this.DRAGM, false);
    document.addEventListener('mouseup', this.DRAGE, false);
    // 存储按下时鼠标所在x轴坐标
    this.prevX = e.pageX;
}
function dragMove(e) {
    // 拖动
    // 1. 拖动的过程中实时计算鼠标相对于初始位置移动了多少
    let moveX = e.pageX - this.startX;
    let moveY = e.pageY - this.startY;
    // 2. 计算盒子应该出现的位置
    let curL = this.startL + moveX;
    let curT = this.startT + moveY;
    // 3. 将盒子的left、top分别设置成它应该出现的位置
    this.style.left = `${curL}px`;
    this.style.top = `${curT}px`;
    // 4. 因为两次mousemove事件触发的时间是固定的,所以把两次之间鼠标走过的距离当做速度。
    this.hSpeed = e.pageX - this.prevX;
    this.pageX = e.pageX; // 每次mousemove都需要更新 prevX,因为本次是下一次的上一次
}
function dragEnd(e) {
    // this.releaseCapture(); Chrome不兼容此方法
    // 结束拖拽
    document.removeEventListener('mousemove', this.DRAGM, false);
    document.removeEventListener('mouseup', this.DRAGE, false);
    this.flyTimer = setInterval(() => fly.call(this), 20); // 执行水平方向的动画
    this.maxL = (document.documentElement.clientWidth || document.body.clientWidth) - this.offsetWidth;
    this.maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.offsetHeight;
}

function fly() {
    // 方法是处理水平方向的动画的
    // 1.计算下一时刻盒子应该处于的位置
    this.hSpeed *= 0.98; // 不断的让速度衰减
    if(Math.abs(this.hSpeed) < 1) {
        // 当hSpeed小于一定值的时候,在浏览器中盒子的动画已经看不出来了,这时候这个动画已经没有意义,所以需要清除定时器，结束动画
        clearInterval(this.flyTimer);
        return;
    }
    let curL = parseFloat(this.style.left) + this.hSpeed;
    // 2. 越界判断，如果越界需要修正 
    if(curL > this.maxL) {
         curL = this.maxL;
         this.hSpeed *= -1; // 乘以-1是让盒子到了右边界反弹
    } else if(curL < 0) {
        curL = 0;
        this.hSpeed *= -1;// 表示已经到达左边界，我们需要它反弹，
    }
    this.style.left = `${curL}px`;

}