/* Given an m x n matrix. If an element is 0, set its entire row and column to 0. Do it in-place.

Follow up:

    A straight forward solution using O(mn) space is probably a bad idea.
    A simple improvement uses O(m + n) space, but still not the best solution.
    Could you devise a constant space solution?

Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
*/

var setZeroes = function(matrix) {
    var track = []

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 0) track.push([i, j])
        }
    }

    for (var i = 0; i < track.length; i++) {
        var [x, y] = track[i]

        for (var j = 0; j < matrix[0].length; j++) {
            matrix[x][j] = 0
        }

        for (var j = 0; j < matrix.length; j++) {
            matrix[j][y] = 0
        }

    }
};
