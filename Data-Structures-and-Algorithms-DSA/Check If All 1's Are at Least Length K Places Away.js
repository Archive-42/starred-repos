/* Given an array nums of 0s and 1s and an integer k, return True if all 1's are at least k places away from each other, 
otherwise return False.

Input: nums = [1,0,0,0,1,0,0,1], k = 2
Output: true
Explanation: Each of the 1s are at least 2 places away from each other.
*/


var kLengthApart = function(nums, k) {
    let interval = 1,
        idx = nums.indexOf(1);
    while (0 <= idx && ++idx < nums.length) {
        if (nums[idx]) {
            if (--interval < k) {
                return false;
            }
            interval = 0;
        }
        interval++;
    }
    return true;
};
