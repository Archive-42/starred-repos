/* On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. 
A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

Given the puzzle board board, return the least number of moves required so that the state of the board is solved. 
If it is impossible for the state of the board to be solved, return -1.

Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap the 0 and the 5 in one move.
*/

var slidingPuzzle = function(board) {
    const mapping = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4],
        4: [1, 3, 5],
        5: [2, 4]
    }
    const swap = (state, pos, next) => {
        const array = state.split('');
        [array[pos], array[next]] = [array[next], array[pos]];
        return array.join('')
    }
    let state = '';
    board.forEach(row => state += row.join(''));

    const visited = new Set(state);
    const q = [
        [state, state.indexOf('0'), 0]
    ];

    while (q.length) {

        const [state, pos, moves] = q.shift();

        if (state == '123450')
            return moves; 
        for (let next of mapping[pos]) {
            const newState = swap(state, pos, next);

            if (visited.has(newState))
                continue;

            visited.add(newState);
            q.push([newState, next, moves + 1])
        }
    }
    return -1;
};
