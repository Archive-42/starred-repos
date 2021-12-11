/* You are given an integer array arr.

We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return the largest number of chunks we can make to sort the array.

Input: arr = [5,4,3,2,1]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [5, 4], [3, 2, 1] will result in [4, 5, 1, 2, 3], which isn't sorted.
*/

var maxChunksToSorted = function(arr) {
    let sortArr = [...arr].sort((a, b) => a - b);
    let sum1 = 0,
        sum2 = 0,
        count = 0;
    for (let i = 0; i < arr.length; i++) {
        sum1 += arr[i];
        sum2 += sortArr[i];
        if (sum1 == sum2) {
            count += 1;
            sum1 = 0;
            sum2 = 0;
        }
    }
    return count
};
