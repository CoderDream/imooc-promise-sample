/* eslint-disable prefer-promise-reject-errors,eol-last */
let p1 = new Promise((resolve, reject) => resolve(42));
let p2 = new Promise((resolve, reject) => reject(43));
let p3 = new Promise((resolve, reject) => resolve(44));

let p4 = Promise.all([p1, p2, p3]);
let p5 = Promise.all([p1, p3]);
p1.then(v => console.log('p1 then: ' + v));// p1 then: 42
p4.then(v => console.log('p4 then: ' + v)); // 不执行
p4.catch(v => console.log('catch: ' + v)); // catch: 43 p2被拒绝，p4的拒绝处理函数立即调用，不会等p1和p3结束执行。但p1和p2仍然会执行。
p5.then(v => {
    console.log(Array.isArray(v)); // true
    console.log(v); // [ 42, 44 ]
});