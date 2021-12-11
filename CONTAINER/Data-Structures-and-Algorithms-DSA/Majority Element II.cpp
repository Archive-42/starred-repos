/* Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

Follow-up: Could you solve the problem in linear time and in O(1) space?

Input: nums = [3,2,3]
Output: [3]
*/

vector < int > majorityElement(vector < int > & nums) {
  unordered_map < int, int > m;
  int n = nums.size();
  for (int i = 0; i < n; i++) {
    m[nums[i]]++;
  }
  vector < int > list;
  for (auto u: m) {
    if (u.second > (n / 3)) {
      list.push_back(u.first);
    }
  }
  return list;

}
