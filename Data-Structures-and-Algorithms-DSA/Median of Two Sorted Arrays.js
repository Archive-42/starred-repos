/* Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
*/


var findMedianSortedArrays = function(nums1, nums2) {
    let final = nums1.concat(nums2);
    final.sort(function(a, b) {
        return a - b
    })
    let n = final.length;
    if (n % 2 !== 0) {
        return final[Math.floor(n / 2)];
    } else
        return (final[Math.floor(n / 2)] + final[Math.floor((n / 2) - 1)]) / 2;
};
