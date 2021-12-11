/*Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.
Example:

Input:
nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
*/


var twoSum = function(nums, target) {
    var a=[];
    for (i=0;i<nums.length;i++){
        for (j=i+1;j<nums.length;j++){
            sum = nums[i]+nums[j];
            if(sum==target){
                a[0]=i;
                a[1]=j;
            }
        }
    }
    return a;
     
};
