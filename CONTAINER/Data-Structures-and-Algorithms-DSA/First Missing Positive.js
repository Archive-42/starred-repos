/* Given an unsorted integer array nums, find the smallest missing positive integer.

Input: nums = [1,2,0]
Output: 3

Input: nums = [3,4,-1,1]
Output: 2
*/

var firstMissingPositive = function(nums) {
    nums.sort((a, b) => a - b);
    return nums.reduce((acc, val) => acc === val ? acc + 1 : acc, 1);
};
