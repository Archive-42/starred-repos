/* Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

    Only numbers 1 through 9 are used.
    Each number is used at most once.

Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.


Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.
*/

var combinationSum3 = function(k, n) {
    const res = []

    function permute(arr, sum, start) {
        if (sum > n) return;

        if (arr.length === k) {
            if (sum === n) res.push(arr);
            return;
        }

        for (let i = start; i < 10; i++) {
            permute([...arr, i], sum + i, i + 1);
        }
    }
    permute([], 0, 1);
    return res;
};
