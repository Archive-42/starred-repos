/*Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/

var permute = function(nums) {
    let ans = []
    let temp = []
    let visited = []
    for (let i = 0; i < nums.length; i++) visited[i] = 0

    function dfs() {
        if (temp.length == nums.length) {
            ans.push([...temp])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (visited[i] == 0) {
                temp.push(nums[i])
                visited[i] = 1
                dfs()
                temp.pop()
                visited[i] = 0
            }
        }

    }
    dfs()
    return ans

};
