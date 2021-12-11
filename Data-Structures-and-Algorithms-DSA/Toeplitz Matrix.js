/* Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.

A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
Explanation:
In the above grid, the diagonals are:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
In each diagonal all elements are the same, so the answer is True.
*/

var isToeplitzMatrix = function(matrix) {
    for (let i = 0, len = matrix.length - 1; i < len; i++) {
        const thisRow = matrix[i].slice(0, -1);
        const nextRow = matrix[i + 1].slice(1);
        const isEqual = thisRow.every((v, j) => v === nextRow[j]);
        if (!isEqual) return false;
    }
    return true;
};
