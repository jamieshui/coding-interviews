/**
 * 单调栈
 * 
 * LeetCode 84 题的变式，只要求出每层的heights[]，将其传入上一题的函数即可。
 */


/**
 * @param {character[][]} matrix
 * @return {number}
 */
 var maximalRectangle = function(matrix) {
    let res = 0;
    const heights = new Array(matrix[0].length).fill(0);
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] === '1') heights[col]++;
            else heights[col] = 0;
        }
        res = Math.max(res, largestRectangleArea(heights));
    }
    return res;
};

var largestRectangleArea = function(heights) {
    let res = 0;
    const stack = [];
    heights = [0, ...heights, 0];
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