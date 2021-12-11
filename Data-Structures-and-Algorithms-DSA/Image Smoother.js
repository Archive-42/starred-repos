/* An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells 
(i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the average 
(i.e., the average of the four cells in the red smoother).


Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0
*/


var imageSmoother = function(M) {
    const n = M.length;
    const m = M[0].length;
    const result = Array.from(Array(n), () => new Array(m));

    const dir = [
        [0, 0],
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1]
    ];

    const smoothCell = (l, k) => {
        let sum = 0;
        let count = 0;
        for (let [i, j] of dir) {
            l += i;
            k += j;
            if (l >= 0 && l < n && k >= 0 && k < m) {
                sum += M[l][k];
                count++;
            }
            l -= i;
            k -= j;
        }
        return ~~(sum / count);
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            result[i][j] = smoothCell(i, j);
        }
    }
    return result;
};
