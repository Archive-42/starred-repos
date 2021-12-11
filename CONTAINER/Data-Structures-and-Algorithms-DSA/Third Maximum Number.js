/* Given integer array nums, return the third maximum number in this array. If the third maximum does not exist, return the maximum number.

Input: nums = [3,2,1]
Output: 1
Explanation: The third maximum is 1.
*/

var thirdMax = function(nums) {
    const sorted = [...new Set(nums)].sort((a,b) => b - a)
    return sorted.length > 2 ? sorted[2] : sorted[0]
};
