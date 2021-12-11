#include <iostream>
#include <vector>

using namespace std;


class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        if (matrix.empty())
            return res;
        auto R = matrix.size(), C = matrix.front().size(); //limitation
        // cout << R << C << endl;
        // bool seen[R][C] ={{false}, {false}}; //footprint
        vector<vector<bool>> seen(R, vector<bool>(C, false));
        int dr[] = {0, 1, 0, -1}; //clockwise
        int dc[] = {1, 0, -1, 0};
        int r = 0, c = 0, i = 0; //current place
        for (int j = 0; j < R * C; ++j) {
            seen[r][c] = true;
            res.push_back(matrix[r][c]);
            int nr = r + dr[i]; //next step
            int nc = c + dc[i];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && !seen[nr][nc]){ //then I can take the next step
                r = nr;
                c = nc;
            } else { //it's time to rotate
                i = (i +1) % 4; //only four choices, take care.
                r = r + dr[i];
                c = c + dc[i];
            } //else
        } //for
        return res;
    }

    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n));
        int r = 0, c = 0, di = 0; //current place
        int dr[] = {0, 1, 0, -1}; //direction control
        int dc[] = {1, 0, -1, 0};
        vector<vector<bool>> seen(n, vector<bool>(n, false)); //footprint
        for (int i = 1; i <= n * n; ++i) {
            res[r][c] = i;
            seen[r][c] = true;
            int nr = r + dr[di]; //next step
            int nc = c + dc[di];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc]){
                r = nr;
                c = nc;
            } else { //it's time to rotate
                i = (i +1) % 4; //only four choices, take care.
                r = r + dr[i];
                c = c + dc[i];
            } //else
        }//for
        return res;
    }
};