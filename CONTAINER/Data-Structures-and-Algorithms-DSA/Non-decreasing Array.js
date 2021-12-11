/* Given an array nums with n integers, your task is to check if it could become non-decreasing by modifying at most one element.

We define an array is non-decreasing if nums[i] <= nums[i + 1] holds for every i (0-based) such that (0 <= i <= n - 2).

Input: nums = [4,2,3]
Output: true
Explanation: You could modify the first 4 to 1 to get a non-decreasing array
*/


var checkPossibility = function(nums) {
    let elemToModify = 0;
    for (i = 0; i < nums.length; i++) {
        if (nums[i] > nums[i+1]) {
            if (nums[i-1] > nums[i+1]) {
                nums[i+1] = nums[i];
            }
            elemToModify++;
        }
        if (elemToModify > 1) return false;
    }     
    return true;
};
