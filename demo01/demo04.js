function runAsync(callback) {
    setTimeout(function () {
        console.log('执行完成');
        callback('随便什么数据');
    }, 2000);
}

runAsync(function (data) {
    console.log(data);
});