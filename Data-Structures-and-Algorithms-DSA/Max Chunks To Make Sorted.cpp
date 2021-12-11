/* Given an array arr that is a permutation of [0, 1, ..., arr.length - 1], we split the array into some number of "chunks" (partitions), and individually sort each chunk.  
After concatenating them, the result equals the sorted array.

What is the most number of chunks we could have made?

Input: arr = [4,3,2,1,0]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2], which isn't sorted.
*/

int maxChunksToSorted(vector < int > & arr) {
  int ptr = 0;
  int curr_max = 0;
  int n = arr.size();
  int ans = 0;
  for (int i = 0; i < n; i++) {
    int curr = arr[i];
    curr_max = max(curr_max, curr);
    if (curr_max == i) {
      ans++;
      curr_max = 0;
    }
  }
  return ans;
}
