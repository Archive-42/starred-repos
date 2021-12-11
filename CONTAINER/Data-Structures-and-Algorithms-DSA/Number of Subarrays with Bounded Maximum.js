/* Given an integer array nums and two integers left and right, return the number of contiguous non-empty subarrays such that 
the value of the maximum array element in that subarray is in the range [left, right].

The test cases are generated so that the answer will fit in a 32-bit integer.

Input: nums = [2,1,4,3], left = 2, right = 3
Output: 3
Explanation: There are three subarrays that meet the requirements: [2], [2, 1], [3].
*/

var numSubarrayBoundedMax = function(nums, left, right) {
    let lastInRange = -1,
        lastOverBound = -1,
        sum = 0;

    for (let i = 0; i < nums.length; i++) {

        const el = nums[i];

        if (el > right) {
            lastOverBound = i;
            continue;
        }
        if (el >= left && el <= right) {
            lastInRange = i;
        }
        if (lastInRange <= lastOverBound) continue;

        sum += lastInRange - lastOverBound;
    }

    return sum;
};
