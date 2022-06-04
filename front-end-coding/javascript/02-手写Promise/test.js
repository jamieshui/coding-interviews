/**
 * 手写Promise基础版：已实现resolve/reject、then、异步
 *          - 待实现then的链式调用
 */

const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

class myPromise {
    // 为了统一，用static创建静态属性，用来管理状态
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    // 构造函数：通过new命令生成对象实例时，自动调用类的构造函数
    constructor(func) { // 给类的构造方法constructor添加一个参数func
        this.PromiseState = myPromise.PENDING; // 指定Promise对象的状态属性 PromiseState，初始值为pending
        this.PromiseResult = null; // 指定Promise对象的结果 PromiseResult
        this.onFulfilledCallbacks = []; // 保存成功回调
        this.onRejectedCallbacks = []; // 保存失败回调
        try {
            /**
             * func()传入resolve和reject，
             * resolve()和reject()方法在外部调用，这里需要用bind修正一下this指向
             * new 对象实例时，自动执行func()
             */
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            // 生成实例时(执行resolve和reject)，如果报错，就把错误信息传入给reject()方法，并且直接执行reject()方法
            this.reject(error)
        }
    }
    resolve(result) { // result为成功态时接收的终值
         // 只能由pedning状态 => fulfilled状态 (避免调用多次resolve reject)
        if (this.PromiseState === myPromise.PENDING) {
            /**
             * 为什么resolve和reject要加setTimeout?
             * 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
             * 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
             * 这个事件队列可以采用“宏任务（macro-task）”机制，比如setTimeout 或者 setImmediate； 也可以采用“微任务（micro-task）”机制来实现， 比如 MutationObserver 或者process.nextTick。 
             */
            setTimeout(() => {
                this.PromiseState = myPromise.FULFILLED;
                this.PromiseResult = result;
                /**
                 * 在执行resolve或者reject的时候，遍历自身的callbacks数组，
                 * 看看数组里面有没有then那边 保留 过来的 待执行函数，
                 * 然后逐个执行数组里面的函数，执行的时候会传入相应的参数
                 */
                this.onFulfilledCallbacks.forEach(callback => {
                    callback(result)
                })
            });
        }
    }
    reject(reason) { // reason为拒绝态时接收的终值
        // 只能由pedning状态 => rejected状态 (避免调用多次resolve reject)
        if (this.PromiseState === myPromise.PENDING) {
            setTimeout(() => {
                this.PromiseState = myPromise.REJECTED;
                this.PromiseResult = reason;
                this.onRejectedCallbacks.forEach(callback => {
                    callback(reason)
                })
            });
        }
    }
    then(onFulfilled, onRejected) {
        /**
         * 参数校验：Promise规定then方法里面的两个参数如果不是函数的话就要被忽略
         * 所谓“忽略”并不是什么都不干，
         * 对于onFulfilled来说“忽略”就是将value原封不动的返回，
         * 对于onRejected来说就是返回reason，
         *     onRejected因为是错误分支，我们返回reason应该throw一个Error
         */
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        };
        if (this.PromiseState === myPromise.PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
        if (this.PromiseState === myPromise.FULFILLED) {
            setTimeout(() => {
                onFulfilled(this.PromiseResult);
            });
        }
        if (this.PromiseState === myPromise.REJECTED) {
            setTimeout(() => {
                onRejected(this.PromiseResult);
            });
        }
    }
}

/**
 * 测试代码1：验证 resolve 和 reject 的实现
 * - 1.1 管理状态和结果
 *   1.2 this 指向问题
 */
console.log("测试代码1：验证 resolve 和 reject 的实现")
let promise1_1 = new myPromise((resolve, reject) => {
    resolve('这次一定');
})
console.log(promise1_1);
let promise1_2 = new myPromise((resolve, reject) => {
    reject('下次一定');
})
console.log(promise1_2); 

/**
 * 测试代码2：验证 then 方法的实现
 * - 2.1 状态不可变
 *   2.2 执行异常 throw
 *   2.3 参数校验
 */
console.log("测试代码2：验证 then 方法的实现")
// 2.1
let promise2_1 = new myPromise((resolve, reject) => {
    resolve('这次一定');
    reject('下次一定');
})
promise2_1.then(
    result => {
        console.log(result)
    },
    reason => {
        console.log(reason.message)
    }
)

//2.2
let promise2_2 = new myPromise((resolve, reject) => {
    throw new Error('白嫖不成功');
})
promise2_2.then(
    result => {
        console.log('fulfiiled:', result)
    },
    reason => {
        console.log('rejected:', reason)
    }
)

//2.3
let promise2_3 = new Promise((resolve, reject) => {
    throw new Error('白嫖不成功');
})

promise2_3.then(
    undefined,
    reason => {
        console.log('rejected:', reason)
    }
)

/**
 * 测试代码3：异步的实现
 * - 3.1 添加定时器
 *   3.2 回调保存
 *   3.3 then 方法多次调用
 */
console.log("测试代码3：异步的实现")
//3.1
console.log(1);
let promise3_1 = new myPromise((resolve, reject) => {
    console.log(2);
    resolve('这次一定');
})
promise3_1.then(
    result => {
        console.log('fulfilled:', result);
    },
    reason => {
        console.log('rejected:', reason)
    }
)
console.log(3);

//3.2
console.log(1);
let promise3_2 = new myPromise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        console.log('A', promise3_2.PromiseState);
        resolve('这次一定');
        console.log('B', promise3_2.PromiseState);
        console.log(4);
    });
})
promise3_2.then(
    result => {
        console.log('C', promise3_2.PromiseState);
        console.log('fulfilled:', result);
    },
    reason => {
        console.log('rejected:', reason)
    }
)
console.log(3);

//3.3
const promise3_3 = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 2000);
})
promise3_3.then(value => {
    console.log(1)
    console.log('resolve', value)
})
promise3_3.then(value => {
    console.log(2)
    console.log('resolve', value)
})
promise3_3.then(value => {
    console.log(3)
    console.log('resolve', value)
})
  
  