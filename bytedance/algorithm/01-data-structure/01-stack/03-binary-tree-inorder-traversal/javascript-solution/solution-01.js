
/**
 * 迭代
 * 
 * 时间复杂度：O(n) 空间复杂度：O(n)
 * - 每到一个节点 node，先将 node 入栈，再遍历其左子树，接着访问 node ，最后遍历右子树。
 *   在访问完 node 后，node 就可以出栈了。因为 node 和其左子树都已经访问完成。
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
 * @return {number[]}
 */
 var inorderTraversal = function(root) {
    if (!root) return [];
    const res = [];
    const stack = [];
    let p = root;
    while (stack.length || p) {
        while (p) {
            stack.push(p);
            p = p.left;
        }
        const node = stack.pop();
        res.push(node.val);
        p = node.right;
    }
    return res;
};