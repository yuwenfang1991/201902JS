// var i = 3;
// function fn() {
//   i += 2;
//   return function(n) {
//     console.log(n * i++);
//   };
// }
// var f = fn();
// f(3); // 15
// fn()(3); //24
// fn()(4); //44
// f(4); //48

// var num = 1;// 4 14
// var obj = { num: 2 };
// obj.fn = (function(num) {
//   this.num = num2 * 2;
//   num++;
//   return function(n) {
//     this.num += n;
//     num++;
//     console.log(num);
//   };
// })(obj.num);
// var fn = obj.fn;
// fn(10); // 4
// obj.fn(20); // 5
// console.log(num, obj.num); // 14  22

//    var num = 20;
//    var obj = {
//        num: 30,
//        fn: (function (num) {
//            this.num *= 3;
//            num += 15;
//            var num = 45;
//            return function () {
//                this.num *= 4;
//                num += 20;
//                console.log(num);
//            }
//        })(num)
//    };
//    var fn = obj.fn;
//    fn();
//    obj.fn();
//    console.log(window.num, obj.num);

// const obj = {
//   foo: "bar",
//   func: function() {
//     const self = this
//     console.log(this.foo)
//     console.log(self.foo)
//     ;(() => {
//       console.log(this.foo)
//       console.log(self.foo)
//     })()
//   }
// }
// obj.func()

// a = aabbcc x = undefined y = undefined
// x = window y = undefined
// function a(xx, yy) {
//   // this-->window xx:5 yy: undefined
//   // this-->window xx:1 yy: 6
//   this.x = xx;
//   this.y = yy
//   return this;
// }
// var x = a(5);
// var y = a(1, 6);
// console.log(x.x);
// console.log(y.x);



var n = 2;
var obj = {
    n: 3,
    fn: (function (n) {
        n *= 2;
        this.n += 2;
        var n = 5;
        return function (m) {
            this.n *= 2;
            console.log(m + (++n));
        }
    })(n)  // obj.n会报错
};
var fn = obj.fn;
fn(3);
obj.fn(3);
console.log(n, obj.n);