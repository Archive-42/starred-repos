/* You are given a sorted unique integer array nums.

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

    "a->b" if a != b
    "a" if a == b

Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
*/

var summaryRanges = function(nums) {
    let res = [];

    for (let i = 0; i < nums.length; i++) {
        let arr = [nums[i]];
        while (nums[i + 1] === nums[i] + 1) i++;
        if (arr[0] !== nums[i]) arr[1] = nums[i];
        res.push(arr);
    }
    return res.map(arr => arr.join("->"));
};
