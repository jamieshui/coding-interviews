/**
 * 解法一：回溯剪枝
 */

const swap = (str, i, j) => [str[i], str[j]] = [str[j], str[i]];

/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
    const res = [];
    const arr = s.split(''); 
    const backtrack = (start) => {
        if (start === arr.length) {
            res.push(arr.slice().join(''));
            return;
        }
        const map = [];
        for (let i = start; i < arr.length; i++) {
            if (map[arr[i]]) { continue; }
            map[arr[i]] = true;
            swap(arr, i, start);
            backtrack(start + 1);
            swap(arr, i, start);
        }
    };
    backtrack(0);
    return res;
};