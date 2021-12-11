/* Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into sets of k consecutive numbers
Return True if it is possible. Otherwise, return False.

Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: true
Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].
*/


 bool isPossibleDivide(vector < int > & nums, int k) {
   map < int, int > M;
   for (auto a: nums) M[a]++;

   while (!M.empty()) {
     int start = M.begin() -> first;
     for (int i = 0; i < k; i++) {
       int cur = start + i;
       if (M.find(cur) != M.end()) {
         if (M[cur] > 0) M[cur]--;
         if (M[cur] == 0) M.erase(cur);
       } else return false;
     }
   }
   return true;
 }
