/* Given a 2D integer array matrix, return the transpose of matrix.

The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
*/

var transpose = function(A) {
    let result = [];
    
    for(let i= 0; i<A[0].length; i++){
        let currentCol = []
        for(let j=0; j<A.length; j++){
            currentCol.push(A[j][i])
        }
        result.push(currentCol);
    }
    return result
};
