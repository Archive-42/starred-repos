/* Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.


Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
*/

var findDisappearedNumbers = function(nums) {
    let res = [];
    let len = nums.length;
    let set = new Set(nums) // [1,2,3,4,7,8];
    for (let i = 1; i <= len; i++) {
        if (!set.has(i)) res.push(i)
    }
    return res;
};
