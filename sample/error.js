// Promise会自动捕获内部异常，并交给rejected响应函数处理-catch捕获
// https://www.imooc.com/video/16620

console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
        throw new Error('bye');
    }, 2000);
}).then(value => {
    // 不会执行
    console.log(value + ' world');
}).catch(error => {
    // 抛出错误
    console.log('Error：', error.message);
});
