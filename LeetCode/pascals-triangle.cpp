//
// Created by admin on 2018/10/30.
//
#include <vector>
#include <iostream>
#include <utility>
using namespace std;


class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        getLevel(res, numRows);
        return res;
    }

    vector<int> getLevel(vector<vector<int>> &ans, int n){
        if (n == 1){
            ans.push_back({1});
            return {1};
            }
        vector<int> last = getLevel(ans, n - 1);
        vector<int> res(n, 1);
        for (int i = 0; i < n - 2; i++)
            res[1 + i] = last[1 + i] + last[i];
        ans.push_back(res);
        return res;
    }
};


int main(){
    tuple t;

    Solution s;
//    s.getLevel(4);
    return 0;
}