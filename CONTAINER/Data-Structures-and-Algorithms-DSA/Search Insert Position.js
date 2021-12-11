/* Given a sorted array of distinct integers and a target value, return the index if the target is found. 
If not, return the index where it would be if it were inserted in order.

Input: nums = [1,3,5,6], target = 5
Output: 2
*/

var searchInsert = function(nums, target) {
    if (nums[0] > target) return 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target || (nums[i] > target && nums[i - 1] < target)) return i;
    }
    return nums.length;
};
