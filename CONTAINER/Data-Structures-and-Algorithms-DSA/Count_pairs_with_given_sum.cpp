/*Given an array of integers. Find the Inversion Count in the array. 
Given an array of N integers, and an integer K, find the number of pairs of elements in the array whose sum is equal to K.
Input:
N = 4, K = 6
arr[] = {1, 5, 7, 1}
Output: 2
Explanation: 
arr[0] + arr[1] = 1 + 5 = 6 
and arr[1] + arr[3] = 5 + 1 = 6.
*/

 int getPairsCount(int arr[], int n, int k) {
   
   int count;
   for (int i = 0; i < n - 1; i++) {
     for (int j = i + 1; j < n; j++) {
       if (arr[i] + arr[j] == k) {
         count++;
       }
     }
   }
   return count;
 }
