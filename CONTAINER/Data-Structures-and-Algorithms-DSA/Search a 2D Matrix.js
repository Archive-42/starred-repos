/* Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.

Input: matrix =  [[1,3,5,7],[10,11,16,20],[23,30,34,50]], target = 10
Output: true
*/

//Code in JS
var searchMatrix = function(matrix, target) {
    let m = matrix.length;
    let n = matrix[0].length;
    let x = 0;
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] <= target) {
            x = i;
        }
    }
    for (let i = 0; i < n; i++) {
        if (matrix[x][i] == target) {
            return true;
        }
    }
    return false;
};
