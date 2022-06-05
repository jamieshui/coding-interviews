
const arr = ['赵', '钱', '孙', '孙', '李', '周', '李', '周', '李'];
const map = {};
arr.forEach(val => !map[val] ? map[val] = 1 : map[val]++);
const res = Object.keys(map).sort((a, b) => map[b] - map[a])[0]; // 只返回出现次数最多的元素之一
console.log(res);

let arr1 = ['赵', '钱', '孙', '孙', '李', '周', '李', '周', '周', '李'];
const map1 = {};
arr1.forEach(val => !map1[val] ? map1[val] = 1 : map1[val]++);
const res1 = Object.keys(map1).sort((a, b) => map1[b] - map1[a]).filter((val, i, arr) => map1[val] === map1[arr[0]]); // 返回出现次数最多的元素数组
console.log(res1);

