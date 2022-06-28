/** 动态规划 */

function jumpFloor(number)
{
    // write code here
    if (number < 2) return 1;
    let dp0 = 1, dp1 = 1;
    for (let i = 2; i <= number; i++) {
        let tmp = dp0;
        dp0 = dp1;
        dp1 += tmp;
    }
    return dp1;
}
module.exports = {
    jumpFloor : jumpFloor
};