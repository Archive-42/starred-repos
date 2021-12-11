/* Given an integer array nums, find three numbers whose product is maximum and return the maximum product.


Input: nums = [1,2,3]
Output: 6
*/

var maximumProduct = function(nums) {
    nums.sort((a, b) => b - a);
    return Math.max(
        nums[0] * nums[1] * nums[2],
        nums[0] * nums[nums.length - 1] * nums[nums.length - 2]
    );

};
