/**
 * 解法一：单调栈
 * 
 * 思路：遍历heights数组，将其中的元素加入单调递减栈，如果当前柱子的高度大于栈顶柱子的高度， 不断出栈，相当于找到左边比当前柱子矮的位置，然后每次出栈之后都要累加一下面积。
 * 
 * 复杂度：时间复杂度O(n)，n是heights的长度，数组中的每个元素最多入栈出栈一次。空间复杂度O(n)，栈的空间，最多不会超过heights的长度
 */

/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    let res = 0;
    const stack = [];
    for (let i = 0; i < height.length; i++) {
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            let top = stack.pop();
            if (!stack.length) break;
            let left = stack[stack.length - 1];
            let curWidth = i - left - 1;
            let curHeight = Math.min(height[left], height[i]) - height[top];
            res += curWidth * curHeight;
        }
        stack.push(i);
    }
    return res;
};
