/* Given an integer array nums, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order.

Return the shortest such subarray and output its length.



Input: nums = [2,6,4,8,10,9,15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
*/

var findUnsortedSubarray = function(nums) {
    const sortedArr = [...nums].sort((a, b) => a - b);

    for (var first = 0; first < nums.length && nums[first] == sortedArr[first]; first++);
        if (first == nums.length - 1)
            return 0;

    for (var last = nums.length - 1; last >= first && nums[last] == sortedArr[last]; last--);
        return last - first + 1;
};
