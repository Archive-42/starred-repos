/* Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

Follow up: Could you write an algorithm with O(log n) runtime complexity?

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
*/


var searchRange = function(arr, x) {
    let n = arr.length;
    const ar = new Array()
    let first = -1,
        last = -1;
    for (let i = 0; i < n; i++) {
        if (arr[i] == x) {
            if (first == -1)
                first = i;
            last = i;
        }
    }
    ar[0] = first;
    ar[1] = last;
    return ar;
};
