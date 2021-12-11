/* Given an array of integers and another number. Find all the unique quadruple from the given array that sums up to the given number.

Input:
N = 7, K = 23
A[] = {10,2,3,4,5,7,8}
Output: 2 3 8 10 $2 4 7 10 $3 5 7 8 $
Explanation: Sum of 2, 3, 8, 10 = 23,
sum of 2, 4, 7, 10 = 23 and sum of 3,
5, 7, 8 = 23
*/

vector < vector < int > > fourSum(vector < int > & nums, int target) {

  int n = nums.size();
  sort(nums.begin(), nums.end());
  set < vector < int >> s;
  int left, right, require, left_common, right_common;
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      left = j + 1;
      right = n - 1;
      require = target - (nums[i] + nums[j]);
      while (left < right) {
        if ((nums[left] + nums[right]) == require) {
          s.insert({
            nums[i],
            nums[j],
            nums[left],
            nums[right]
          });
          right_common = nums[right];
          left_common = nums[left];
          left++;
          right--;
          while (right > left && nums[right] == right_common)
            right--;
          while (left < right && nums[left] == left_common)
            left++;

        } else if ((nums[left] + nums[right]) < require)
          left++;
        else
          right--;

      }

      while (j < n - 1 && nums[j] == nums[j + 1])
        j++;

    }

    while (i < n - 1 && nums[i] == nums[i + 1])
      i++;
  }

  vector < vector < int >> ans;
  for (auto x: s) ans.push_back(x);

  return ans;

}
