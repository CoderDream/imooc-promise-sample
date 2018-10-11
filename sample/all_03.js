let failedList = [];

function getDataById(id) { // 这是单个请求
    return new Promise(function (resolve, reject) {
        getResponse(id, resolve, reject)
    }).catch(e => {
        failedList.push(arguments.callee(id)) // 如果失败，就重新发起请求，并将该请求的promise放入failedList中以便后续处理
    });
}

function getResponse(id, resolve, reject) { // 模拟返回结果
    setTimeout(() => {
        if (Math.random() > 0.8) resolve({id, msg: 'ok'})
        else reject({id, msg: 'error'})
    }, 1000);
}


const RequestList = [getDataById(1), getDataById(2), getDataById(3)]

fetchData(RequestList)

let counter = 1 // 请求次数
let maxRequestTimes = 5 // 最大请求次数，因为有可能别个页面就是访问不了，请求多少次也没用- - 
let result = [] // 最后的结果

function fetchData(requestList) { // 这里是对请求结果的处理
    Promise.all(requestList).then(resolve => {
        result = result.concat(resolve.filter(i => i)) // filter返回true的时候保留该数组项，因为getDataById的catch里没有给返回值（这里也不需要），这里的resolve里就会有undefined，需要过滤掉
        let failedLength = failedList.length
        if (failedLength > 0 && counter < maxRequestTimes) { // 如果失败列表里有请求，并且请求次数不超过设定的值，就进行下一次请求，并且打出log
            console.log(`第${counter}次请求完成，其中成功${RequestList.length - failedLength}个，失败${failedLength}个，正在进行第${++counter}次请求...`)
            fetchData(failedList)
            failedList = [] // 这里要清空failedList，不然会一直调用。不用担心，下一次请求失败的会在getDataById填充到failedList里。
        } else { // 表示所有请求都成功了，或者达到了最大请求次数。到这里就可以对result做进一步处理了。
            console.log(`请求完成，共请求${counter}次, 其中成功${RequestList.length - failedLength}个，失败${failedLength}个\n`, result)
            counter = 1
        }
    }).catch(e => {
        console.log(e)
    })
}