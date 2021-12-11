/* Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

It is guaranteed that the answer will fit in a 32-bit integer.

A subarray is a contiguous subsequence of the array.

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
*/

var maxProduct = function(nums) {

    let max = Number.NEGATIVE_INFINITY
    for (let i = 0; i < nums.length; i++) {
        let product = 1
        for (let j = i; j < nums.length; j++) {
            product = product * nums[j]
            max = Math.max(product, max)
        }
    }
    return max
};
