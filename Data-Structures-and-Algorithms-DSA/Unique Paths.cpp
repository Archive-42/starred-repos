/* A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

Input: m = 3, n = 7
Output: 28
*/

int uniquePaths(int m, int n) {
  vector < vector < int >> dp(m, vector < int > (n, 1));
  for (int i = m - 1; i >= 1; i--) {
    for (int j = n - 1; j >= 1; j--) {
      dp[i - 1][j - 1] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[0][0];
}
