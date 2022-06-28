let n = parseInt(readline());
let arr = [...Array(n)].map(() => readline());
Array.from(new Set(arr)).sort((a, b) => a - b).map((e) => console.log(e));
