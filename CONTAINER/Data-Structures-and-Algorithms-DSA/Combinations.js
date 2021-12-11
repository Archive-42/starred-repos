/* Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].

You may return the answer in any order.

Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
*/

var combine = function(n, k) {
    const combinations = [];

    const build = (arr, index) => {
        if (arr.length === k) return combinations.push(arr.slice());

        for (let i = index; i <= n; i++) {
            arr.push(i);
            build(arr, i + 1);
            arr.pop();
        }
    };

    build([], 1);
    return combinations;
};
