/*You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.

A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.

Return the length longest chain which can be formed.

You do not need to use up all the given intervals. You can select pairs in any order.


Input: pairs = [[1,2],[2,3],[3,4]]
Output: 2
Explanation: The longest chain is [1,2] -> [3,4].
*/


var findLongestChain = function(pairs) {
    const sorted = pairs.sort((a,b) => a[1] - b[1])
    return sorted.reduce((acc, [a, b], i) => {
        if(acc.curr < a) {
            acc.len++
            acc.curr = b
        }
        return acc
    }, { curr: -Infinity, len: 0 }).len
};
