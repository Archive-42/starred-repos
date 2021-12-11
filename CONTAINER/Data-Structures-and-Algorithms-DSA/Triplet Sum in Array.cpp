/*Given an array arr of size N and an integer X. Find if there's a triplet in the array which sums up to the given integer X. 

Input:
N = 6, X = 13
arr[] = [1 4 45 6 10 8]
Output:
1
Explanation:
The triplet {1, 4, 8} in 
the array sums up to 13.
*/

 bool find3Numbers(int arr[], int N, int X) {

   sort(arr, arr + N);
   for (int i = 0; i < N - 2; i++) {
     int left = i + 1, right = N - 1;
     while (left < right) {
       if ((arr[i] + arr[left] + arr[right]) == X) {
         return true;
       } else if ((arr[i] + arr[left] + arr[right]) < X) {
         left++;
       } else {
         right--;
       }
     }
   }
   return false;
 }
