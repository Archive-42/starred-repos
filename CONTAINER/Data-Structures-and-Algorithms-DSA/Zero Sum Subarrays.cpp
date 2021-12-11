/*You are given an array arr[] of size n. Find the total count of sub-arrays having their sum equal to 0.

Input:
n = 10
arr[] = {6,-1,-3,4,-2,2,4,6,-12,-7}
Output: 4
Explanation: The 4 subarrays are [-1 -3 4]
[-2 2], [2 4 6 -12], and [-1 -3 4 -2 2]
*/


ll findSubarray(vector < ll > nums) {
  unordered_map < int, int > ump;
  ump[0] = 1;
  int k = 0;
  int sum = 0;
  int count = 0;
  for (int i = 0; i < nums.size(); i++) {
    sum += nums[i];
    int tofind = sum - k;
    count += ump[tofind];
    ump[sum] += 1;
  }
  return count;
}
