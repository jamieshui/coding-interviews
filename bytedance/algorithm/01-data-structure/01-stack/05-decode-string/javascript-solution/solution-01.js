/**
 * @param {string} s
 * @return {string}
 */
 var decodeString = function(s) {
    let res = '';
    const numStack = [], strStack = [];
    let num = 0;
    for (let x of s) {
        if (!isNaN(x)) {
            num = num * 10 + Number(x);
        } else if (x === '[') {
            strStack.push(res);
            res = '';
            numStack.push(num);
            num = 0;
        } else if (x === ']') {
            let repeatTimes = numStack.pop();
            res = strStack.pop() + res.repeat(repeatTimes);
        } else {
            res += x;
        }
    }
    return res;
};