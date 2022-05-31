/**
 * 考点：Map、栈
 * 时间复杂度：O(n) 空间复杂度：O(n)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
    if (s.length % 2) return false;
    const map = new Map();
    map.set('(', ')');
    map.set('{', "}");
    map.set('[', ']');
    const stack = [];
    for (let x of s) {
        if (map.has(x)) {
            stack.push(x);
        } else {
            if (map.get(stack.pop()) !== x) {
                return false;
            }
        }
    }
    return stack.length === 0;
};