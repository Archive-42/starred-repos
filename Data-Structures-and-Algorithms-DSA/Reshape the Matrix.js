/* In MATLAB, there is a handy function called reshape which can reshape an m x n matrix into a new one with a different size r x c keeping its original data.

You are given an m x n matrix mat and two integers r and c representing the row number and column number of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix in the same row-traversing order as they were.

If the reshape operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.


Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]
*/

var matrixReshape = function(nums, r, c) {
    if (nums.length === 0) return nums;
    let m = nums.length,
        n = nums[0].length;
    if (m * n !== r * c) return nums;
    let res = [];
    let y = 0,
        tmp = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            tmp.push(nums[i][j]);
            y++;
            if (y === c) {
                res.push(tmp);
                [y, tmp] = [0, []];
            };
        }
    }
    return res;
};
