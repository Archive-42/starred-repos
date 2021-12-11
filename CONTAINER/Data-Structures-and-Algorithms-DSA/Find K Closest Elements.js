/* Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

    |a - x| < |b - x|, or
    |a - x| == |b - x| and a < b

Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]
*/

var findClosestElements = function(arr, k, x) {
    return arr.map((v, i) => ({
            value: (v - x < 0) ? Math.abs(v - x) : Math.abs(v - x) + 0.5,
            index: i
        }))
        .sort((l, r) => l.value - r.value)
        .slice(0, k)
        .map(v => arr[v.index])
        .sort((l, r) => l - r);
};
