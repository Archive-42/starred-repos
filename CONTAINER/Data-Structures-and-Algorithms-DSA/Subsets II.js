/* Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
*/

var subsetsWithDup = function(nums) {
    nums.sort()
    const powerset = [];

    function permute(arr, index) {
        powerset.push(arr)

        for (let i = index; i < nums.length; i++) {
            if (i !== index && nums[i] === nums[i - 1]) continue;
            permute([...arr, nums[i]], i + 1)
        }
    }
    permute([], 0);
    return powerset;
};
