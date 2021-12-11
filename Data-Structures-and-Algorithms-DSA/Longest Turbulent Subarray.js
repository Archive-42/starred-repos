/* Given an integer array arr, return the length of a maximum size turbulent subarray of arr.

A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.

More formally, a subarray [arr[i], arr[i + 1], ..., arr[j]] of arr is said to be turbulent if and only if:

    For i <= k < j:
        arr[k] > arr[k + 1] when k is odd, and
        arr[k] < arr[k + 1] when k is even.
    Or, for i <= k < j:
        arr[k] > arr[k + 1] when k is even, and
        arr[k] < arr[k + 1] when k is odd.

Input: arr = [9,4,2,10,7,8,8,1,9]
Output: 5
Explanation: arr[1] > arr[2] < arr[3] > arr[4] < arr[5]
*/

var maxTurbulenceSize = function(A) {
    if (A.length === 1) return 1;
    let count = 1,
        max = 1,
        count1 = 1;
    for (let i = 0; i < A.length; i++) {
        if (A[i] > A[i + 1]) {
            count1 = 1;
            count++;
            max = Math.max(max, count, count1)
            if (A[i + 1] < A[i + 2]) {
                count++;
                max = Math.max(max, count, count1)
                i++
            } else {
                count = 1;
            }
        } else if (A[i] < A[i + 1]) {
            count = 1;
            count1++;
            max = Math.max(max, count, count1)
            if (A[i + 1] > A[i + 2]) {
                count1++;
                max = Math.max(max, count, count1);
                i++
            } else {
                count1 = 1;
            }
        } else {
            count = 1;
            count1 = 1;
        }
    }
    return max;
};
