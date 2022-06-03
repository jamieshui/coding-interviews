
	class MyPromise {
		static PENDING = "pending";
		static FULFILLED = "fulfilled";
		static REJECTED = "rejected";
		constructor(executor) {
			//状态
			this.state = MyPromise.PENDING ;
			//成功时的返回值
			this.value = null;
			//失败信息
			this.reason = null;
			//存储异步操作
			this.onResolvedCallbacks = [];
			this.onRejectedCallbacks = [];
			let resolve = (value) => {
				if(this.state === MyPromise.PENDING){
					this.state = MyPromise.FULFILLED;
					this.value = value;
					this.onResolvedCallbacks.forEach(fn => fn());
				}
			};
			let reject = (reason) => {
				if(this.state === MyPromise.PENDING){
					this.state = MyPromise.REJECTED ;
					this.reason= reason;
					this.onResolvedCallbacks.forEach(fn => fn());
				}
			};
			try{
				executor(resolve,reject);
			}catch(err){
				rejected(err);
			}
		}
		then(onFulfilled,onRejected) {// 成功回调  失败回调
			onFulfilled = typeof onFulfilled === "function" ? onFulfilled:(value)=> value;
			onRejected = typeof onRejected === "function" ? onRejected:(err)=> throw err;
			let promise2 = new MyPromise((resolve,reject)=>{
				if(this.state === MyPromise.FULFILLED){
					setTimeout(()=>{
						try{
							let res = onFulfilled(this.value);
							resovlePromise(promise2,res,resolve,reject);
						}catch(err){
							reject(err);
						}
					},0);
				}
				if(this.state === MyPromise.REJECTED){
					setTimeout(()=>{
						try{
							let res = onRejected(this.reason);
							resovlePromise(promise2,res,resolve,reject);
						}catch(err){
							reject(err);
						}
					},0);
				}
				//处理异步 采用发布订阅者模式
				if(this.state === MyPromise.PENDING){
					this.onResolvedCallbacks.push(()=>{
						setTimeout(()=>{
							try{
								let res = onFulfilled(this.value);
								resovlePromise(promise2,res,resolve,reject);
							}catch(err){
								reject(err);
							}
						},0);
					});
					this.onRejectedCallbacks.push(()=>{
						setTimeout(()=>{
							try{
								let res = onRejected(this.reason);
								resovlePromise(promise2,res,resolve,reject);
							}catch(err){
								reject(err);
							}
						},0);
					});
				}
			});
			return promise2;
		}
		catch(fn) {
			return this.then(null,fn);
		}
	}
	//then回调方法 类型判断 func为成功或失败回调
	function resovlePromise(promise2,func,resolve,reject) {
		if(func === promise2){
			return reject(new TypeError("chaining cycle detected for promise"));
		}
		let called;
		if(func !== null && (typeof func === "object" || typeof func === "function")){
			//当then回调方法的返回值为promise的时候执行
			try{
				let then = func.then;
				if(typeof then === "function"){
					then.call(func,(s)=>{
						if(called)return;
						called = true;
						resovlePromise(promise2,s,resolve,reject);
					},(e)=>{
						if(called)return;
						called = true;
						reject(e);
					})
				}else{
					resolve(func);
				}
			}catch(err){
				if(called)return;
				called = true;
				reject(err)
			}
		}else {
			resolve(func);
		}
	}
	//测试
	new MyPromise((resolve,reject)=>{
		console.log("111");
		setTimeout(()=>{
			resolve("成功1");
		},2000);
	}).then(res => {
		console(res);
		return new MyPromise((resolve,reject)=>{
			setTimeout(()=>{
				resolve("成功2");
			},2000);
		});
	},err => {
		console(err);
	}).then(res => {
		console(res);
	},err => {
		console(err);
	});
