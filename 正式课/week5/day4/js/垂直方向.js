/*
* 目标：
*   1. 理解垂直方向模拟自由落体、动能衰减}动画
*   2. 理解触界反弹
*   3. 理解终止动画时机
*   4. 实现垂直方向动画
* */
/**
 * 垂直方向：
 *  1. 下落的过程是一个加速过程，所以给top 累加的值是一个越来越大的值；
 *  2. 到底会反弹起来，所以要处理越界判断,反弹就是给速度乘等于-1
 *  3. 速度衰减，以模拟因为阻力带来的能量损失；
 *  4. 清除定时器结束动画的时机：当盒子落到底部不能再弹起来的时候就该清除定时器、结束动画；
 */

let dragObj = document.getElementById('dragObj');

dragObj.onmousedown = dragStart;// 监听鼠标按下事件，赋予拖动能力

function dragStart(e) {
    clearInterval(this.flyTimer);
    clearInterval(this.dropTimer);
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
    // 因为拖拽时，mouseup时只做一件事情，就是移除document的 mousemove事件,这样做可以让盒子不在跟随鼠标；但是后期我们给盒子增加了动画，并且是在mouseup时开启动画，这时如果不清除document的 mouseup事件，就会出现在任意地方点击鼠标然后抬起都会触发dragEnd方法进而开启动画，导致定时器累加，所以为了解决这个问题，我们需要在onmouseup事件触发时即
    document.removeEventListener('mouseup', this.DRAGE, false);
    this.maxL = (document.documentElement.clientWidth || document.body.clientWidth) - this.offsetWidth;
    this.maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.offsetHeight;
    // 设置垂直方向的下落初速度
    this.dropSpeed = 0;
    this.flyTimer = setInterval(() => fly.call(this), 20); // 执行水平方向的动画
    this.dropTimer = setInterval(() => drop.call(this), 20); // 执行垂直方向的动画
}

function fly() {
    // 方法是处理水平方向的动画的
    // 1.计算下一时刻盒子应该处于的位置
    this.hSpeed *= 0.98; // 不断的让速度衰减
    if (Math.abs(this.hSpeed) < 1) {
        // 当hSpeed小于一定值的时候,在浏览器中盒子的动画已经看不出来了,这时候这个动画已经没有意义,所以需要清除定时器，结束动画
        clearInterval(this.flyTimer);
        return;
    }
    let curL = parseFloat(this.style.left) + this.hSpeed;
    // 2. 越界判断，如果越界需要修正 
    if (curL > this.maxL) {
        curL = this.maxL;
        this.hSpeed *= -1; // 乘以-1是让盒子到了右边界反弹
    } else if (curL < 0) {
        curL = 0;
        this.hSpeed *= -1;// 表示已经到达左边界，我们需要它反弹，
    }
    this.style.left = `${curL}px`;

}

function drop() {
    // 设置一个标识符，如果盒子触底就++，不触底就等于0
    if(isNaN(this.canBounce)) this.canBounce = 0;
    // 处理垂直方向上的动画；垂直方向的动画就是不断修改盒子的top值
    // 1. 累加速度让速度变大
    this.dropSpeed += 5;
    this.dropSpeed *= .98; // 为了让速度衰减,我们乘以一个小于1的数
    // 2. 计算盒子应该出现的位置
    let curT = parseFloat(this.style.top) + this.dropSpeed;
    // 3. 越界判断处理
    if(curT > this.maxT) {
        curT = this.maxT;
        this.dropSpeed *= -1; //此时盒子触底了,所以需要反弹,就需要给速度乘等于-1；
        this.canBounce++; // 表示盒子已经到底部了，需要给canBounce++
    } else {
        this.canBounce = 0;
    }
    if(curT < 0) {
        curT = 0;
        this.dropSpeed *= -1;
    }
    // 4. 将盒子的top 值设置成它应该去的地方的top值
    this.style.top = `${curT}px`;
    console.log(this.canBounce);
    
    if(this.canBounce >= 2) {
        clearInterval(this.dropTimer);
    }
}