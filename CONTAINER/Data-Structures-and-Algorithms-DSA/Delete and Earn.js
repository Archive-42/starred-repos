/* You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times:

Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.

Return the maximum number of points you can earn by applying the above operation some number of times.

Input: nums = [3,4,2]
Output: 6
Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.
*/

var deleteAndEarn = function(nums) {
    const numTotals = new Map();
    
    nums.forEach(num => {
        const total = numTotals.get(num) || 0;
        numTotals.set(num, total + num); 
    });
    
    let prevMaxPoints = 0;
    let maxPoints = numTotals.get(1) || 0;
    for (let num = 2; num <= 10000; num++) {
        const thisPoints = numTotals.get(num) || 0;
        const newMaxPoints = Math.max(maxPoints, thisPoints + prevMaxPoints);
        prevMaxPoints = maxPoints;
        maxPoints = newMaxPoints;        
    }
    
    return maxPoints;
};
