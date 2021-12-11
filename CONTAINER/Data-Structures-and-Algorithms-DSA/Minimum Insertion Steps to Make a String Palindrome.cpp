/* Given a string s. In one step you can insert any character at any index of the string.

Return the minimum number of steps to make s palindrome.

A Palindrome String is one that reads the same backward as well as forward.

Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we don't need any insertions.

Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
*/


class Solution {
  public:
    int solve(int i, int j, string & s, vector < vector < int >> & dp) {
      if (i >= j) {
        return 0;
      }

      if (dp[i][j]) {
        return dp[i][j];
      }

      int result = INT_MAX;

      if (s[i] == s[j]) {
        dp[i][j] = solve(i + 1, j - 1, s, dp);
        return dp[i][j];
      } else {
        result = min(result, min(solve(i + 1, j, s, dp), solve(i, j - 1, s, dp)) + 1);
        dp[i][j] = result;
        return dp[i][j];
      }
    }

  int minInsertions(string s) {

    int n = s.length();
    vector < vector < int >> dp(n, vector < int > (n, 0));

    return solve(0, n - 1, s, dp);
  }
};
