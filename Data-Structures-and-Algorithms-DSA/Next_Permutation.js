"""Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.

Input: nums = [1,2,3]
Output: [1,3,2]
"""
#Code using JavaScript

var nextPermutation = function(nums) {
    if(nums==null || nums.length<=1)
        return;
    var i = nums.length -2;
    while (i>=0&& nums[i]>=nums[i+1]) 
        i--;
    if(i>=0){
        var j = nums.length -1;
        while(nums[j]<=nums[i])
            j--;
        swap(nums,i,j);
    }
    reverse(nums, i+1, nums.length-1);
};

function swap(nums, i, j){
    var temp = nums[i];
    nums[i] = nums[j];
    nums[j] =temp;
}

function reverse(nums, i, j){
    while(i<j)
        swap(nums, i++, j--);
}
