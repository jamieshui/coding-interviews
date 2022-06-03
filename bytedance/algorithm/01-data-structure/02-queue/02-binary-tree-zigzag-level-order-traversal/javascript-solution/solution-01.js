
/**
 * 广度优先遍历
 * 
 * - 时间复杂度：O(n) 空间复杂度：O(n)
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    let flag = 1;
    while (queue.length) {
        let len = queue.length;
        const curLayer = [];
        while (len--) {
            const node = queue.shift();
            flag > 0 ? curLayer.push(node.val) : curLayer.unshift(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }   
        res.push(curLayer);
        flag = -flag;
    }
    return res;
};