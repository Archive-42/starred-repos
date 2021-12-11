/*Given an array of positive and negative numbers. Find if there is a subarray (of size at-least one) with 0 sum.
Input:
5
4 2 -3 1 6
Output: 
Yes
Explanation: 
2, -3, 1 is the subarray 
with sum 0.
*/

bool subArrayExists(int arr[], int n) {
   unordered_map < int, bool > sumMap;
   int sum = 0;
   for (int i = 0; i < n; i++) {
      sum += arr[i];
      if (sum == 0 || sumMap[sum] == true)
         return true;

      sumMap[sum] = true;
   }
   return false;
}
