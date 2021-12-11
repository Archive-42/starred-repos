/* Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.


Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
Explanation: The repeated subarray with maximum length is [3,2,1].
*/

class Solution {
  public:
    int findLength(vector < int > & nums1, vector < int > & nums2) {
      vector < vector < int >> dp(nums1.size() + 1, vector < int > (nums2.size() + 1, 0));
      int ans = 0;
      for (int i = 1; i <= nums1.size(); i++) {
        for (int j = 1; j <= nums2.size(); j++) {
          dp[i][j] = (nums1[i - 1] == nums2[j - 1] ? dp[i - 1][j - 1] + 1 : 0);
          ans = max(ans, dp[i][j]);
        }
      }
      return ans;
    }
};
