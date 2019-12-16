// 假如在.then()的函数里面不返回新的Promise，会怎样？
// https://www.imooc.com/video/16616

console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 2000);
}).then(value => {
    console.log(value);
    console.log('everyone');
    // 立刻执行的匿名函数
    (function () {
        return new Promise(resolve => {
            // 等待执行，2秒钟后
            setTimeout(() => {
                console.log('Mr.Laurence');
                resolve('Merry Xmas');
            }, 2000);
        });
    }());
    return false; // 如何注释这行，后边打印 undefined world
}).then(value => {
    console.log(value + ' world');
});

// console:
// here we go
// hello
// everyone
// false world
// Mr.Laurence