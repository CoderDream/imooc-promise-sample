var Promise = function(affair){
    this.state = "pending";
    this.affair = affair || function(o) { return o; };
    this.allAffairs = [];
};

Promise.prototype.then = function (nextAffair){
    var promise = new Promise();
    if (this.state == 'resloved'){
        // 如果当前状态是已完成，则这个事务将会被立即执行
        return this._fire(promise, nextAffair);
    }else{
        // 否则将会被加入队列中
        return this._push(promise, nextAffair);
    }
};

Promise.prototype._fire = function (nextPromise, nextAffair){
    var nextResult = nextAffair(this.result);
    if (nextResult instanceof Promise){
        nextResult.then(function(obj){
            nextPromise.resolve(obj);
        });
    }else{
        nextPromise.resolve(nextResult);
    }
    return nextPromise;
};

Promise.prototype._push = function (nextPromise, nextAffair){
    this.allAffairs.push({
        promise: nextPromise,
        affair: nextAffair
    });
    return nextPromise;
};

Promise.prototype.resolve = function (obj){
    if (this.state != 'pending') {
        throw '流程已完成，不能再次开启流程！';
    }
    this.state = 'resloved';
    // 执行该事务，并将执行结果寄存到 Promise 管理器上
    this.result = this.affair(obj);
    for (var i = 0, len = this.allAffairs.length; i < len; ++i){
        // 往后执行事务
        var affair = this.allAffairs[i];
        this._fire(affair.promise, affair.affair);
    }
    return this;
};

// 初始化事务管理器
var promise = new Promise(function(data){
    console.log(data);
    return 1;
});
// 添加事务
promise.then(function(data){
    console.log(data);
    return 2;
}).then(function(data){
    console.log(data);
    return 3;
}).then(function(data){
    console.log(data);
    console.log("end");
});
// 启动事务
promise.resolve("start");