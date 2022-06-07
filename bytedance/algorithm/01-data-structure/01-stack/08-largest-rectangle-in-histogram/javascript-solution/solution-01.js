/**
 *   单调栈
 * 
 * - 思路：准备单调递增栈存放数组下标，因为这样可以从栈顶找到左边第一个比自己小的下标，这样从当前下标出发到第一个比自己小的柱子的下标就是矩形面积的宽度，
 *        然后在乘当前柱子的高度就是面积，如果当前柱子大于栈顶的下标对应的柱子高度，就入栈，否则不断出栈，计算栈顶的柱子所能形成的矩形面积，然后更新最大矩形面积。
 * - 复杂度：时间复杂度O(n)，n是heights的长度，数组里每个元素尽出栈一次。空间复杂度O(n)，栈空间最多为n
 * 
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
 var largestRectangleArea = function(heights) {
    let res = 0;
    const stack = [];
    heights = [0, ...heights, 0]; //在heights数组前后增加两个哨兵 用来清零单调递增栈里的元素
    for (let i = 0; i < heights.length; i++) {
        while (heights[i] < heights[stack[stack.length - 1]]) {
            let stackTopIndex = stack.pop();
            let left = stack[stack.length - 1];
            let curWidth = i - left - 1;
            let curHeight = heights[stackTopIndex];
            res = Math.max(res, curWidth * curHeight);
        }
        stack.push(i);
    }
    return res;
};

