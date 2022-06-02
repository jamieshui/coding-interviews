// 浅拷贝的实现
function shallowCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== "object") return;
  
    // 根据 object 的类型判断是新建一个数组还是对象
    let newObject = Array.isArray(object) ? [] : {};
  
    // 遍历 object，并且判断是 object 的属性才拷贝
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        newObject[key] = object[key];
      }
    }
  
    return newObject;
}
  
// 深拷贝的实现（此处提供两种方法）
/** 方法一：递归 */
function deepCopy1(object) {
    if (!object || typeof object !== "object") return object;

    let newObject = Array.isArray(object) ? [] : {};

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
        newObject[key] = deepCopy1(object[key]);
        }
    }

    return newObject;
}
/** 方法二：序列化与反序列化 
 * - 先将对象转换为json字符串形式，再将转换而来的字符串转换为原生js对象。
 *   但无法拷贝 undefined ， function， RegExp 等类型的数据。
*/
function deepCopy2(obj){
	return JSON.parse(JSON.stringify(obj))
}

// 测试用例 node test.js
var arr = [100, [{a : 'hello'}, {b : "world"}], {c: "123456789"}];
let newArr = deepCopy(arr);
    newArr[1][0].a = 'front-end'
    newArr[0] = 99
    console.log('原数组',arr)
    console.log('新数组',newArr)