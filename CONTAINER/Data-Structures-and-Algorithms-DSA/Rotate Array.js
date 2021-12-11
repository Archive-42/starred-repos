/* Given an array, rotate the array to the right by k steps, where k is non-negative.

Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
*/

var rotate = function(nums, k) {
    if (!nums || !nums.length) return;

    if (k > nums.length) {
        k = k % nums.length;
    }
    nums.unshift(...nums.splice(nums.length - k));
};
