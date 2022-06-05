/**
 * 单调栈
 * 
 * - 时间复杂度：O(n) 空间复杂度：O(n)
 * 1. 如果当前元素比栈顶大，则让小项逐个出栈，直到当前元素比栈顶小，停止出栈
 * 2. 此时的栈顶元素就是当前项右边的第一个比自己大的元素索引，计算距离
 * 3. 当前项入栈
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
 var dailyTemperatures = function(temperatures) {
    const res = new Array(temperatures.length).fill(0);
    const stack = [];
    for (let i = temperatures.length - 1; i >= 0; i--) {
        while (stack.length && temperatures[i] >= temperatures[stack[stack.length - 1]]) {
            stack.pop();
        }
        if (stack.length) {
            res[i] = stack[stack.length - 1] - i;
        }
        stack.push(i);
    }
    return res;
};