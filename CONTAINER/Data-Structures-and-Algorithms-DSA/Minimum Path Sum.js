/*Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
*/

var minPathSum = function(grid) {
    let col = grid.length //column
    let row = grid[0].length //row
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            if (i == 0 && j == 0) {
                continue
            }
            if (i == 0) {
                grid[i][j] = grid[i][j] + grid[i][j - 1]
            } else if (j == 0) {
                grid[i][j] = grid[i][j] + grid[i - 1][j]
            } else {
                grid[i][j] = Math.min(grid[i][j - 1], grid[i - 1][j]) + grid[i][j]
            }
        }
    }
    return grid[grid.length - 1][grid[0].length - 1]
};
