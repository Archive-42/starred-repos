/*Given an array of positive integers nums and a positive integer target, return the minimal length of a 
contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
*/

//Code in JS
function(k, nums) {
    let window_size = Number.MAX_VALUE
    let sum = 0,
        i, left = 0;

    for (i = 0; i < nums.length; i++) {

        sum = sum + nums[i]

        while (sum >= k) {

            window_size = Math.min(window_size, i + 1 - left)
            sum = sum - nums[left]
            left++;

        }
    }

    return (window_size == Number.MAX_VALUE) ? 0 : window_size

};
