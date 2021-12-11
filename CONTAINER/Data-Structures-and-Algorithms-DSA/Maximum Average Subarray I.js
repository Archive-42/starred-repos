/* You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. 
Any answer with a calculation error less than 10-5 will be accepted.

Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
*/

var findMaxAverage = function(nums, k) {
    let maxAvg = Number.MIN_SAFE_INTEGER,
        currentSum = 0;
    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];
        if (i + 1 >= k) {
            maxAvg = Math.max(currentSum / k, maxAvg)
            currentSum -= nums[(i + 1) - k]
        }
    }
    return maxAvg;
};
