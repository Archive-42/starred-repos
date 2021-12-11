/* Given a binary array nums, return the maximum number of consecutive 1's in the array.


Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
*/

var findMaxConsecutiveOnes = function(nums) {
    let count = 0,
        max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            count++;
            if (count > max) max = count;
        } else {
            count = 0;
        }
    }
    return max;
};
