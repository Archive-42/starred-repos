/* You may recall that an array arr is a mountain array if and only if:

    arr.length >= 3
    There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
        arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
        arr[i] > arr[i + 1] > ... > arr[arr.length - 1]


Input: arr = [2,1,4,7,3,2,5]
Output: 5
Explanation: The largest mountain is [1,4,7,3,2] which has length 5.
*/

var longestMountain = function(a) {
  let longestMountainLength = 0;
  let mountainFrom = a.length;

  for (let i = 1; i < a.length; ++i) {
    const beforePrevious = i >= 2 ? a[i - 2] : Infinity;
    const previous = a[i - 1];
    const current = a[i];

    if (current > previous && previous <= beforePrevious) {
      mountainFrom = i - 1;
      continue;
    }

    if (current === previous || beforePrevious === previous) {
      mountainFrom = i;
      continue;
    }

    if (current < previous) {
      longestMountainLength = Math.max(longestMountainLength, i - mountainFrom + 1);
    }
  }

  return longestMountainLength >= 3 ? longestMountainLength : 0;
};
