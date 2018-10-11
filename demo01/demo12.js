class Image {
    
}

//请求某个图片资源
function requestImg() {
    var p = new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            resolve(img);
        }
        img.src = 'xxxxxx';
    });
    return p;
}

//延时函数，用于给请求计时
function timeout() {
    var p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}

Promise
    .race([requestImg(), timeout()])
    .then(function (results) {
        console.log(results);
    })
    .catch(function (reason) {
        console.log(reason);
    });