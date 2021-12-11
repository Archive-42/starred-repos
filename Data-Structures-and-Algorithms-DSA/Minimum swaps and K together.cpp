/*Given an array of n positive integers and a number k. 
Find the minimum number of swaps required to bring all the numbers less than or equal to k together.

Input : arr[ ] = {2, 1, 5, 6, 3} and K = 3
Output : 1
Explanation:
To bring elements 2, 1, 3 together, swap element '5' with '3'
such that final array will be- arr[] = {2, 1, 3, 6, 5}
*/

int minSwap(int * arr, int n, int k) {
  int count = 0, x = 0, ans = 0;
  for (int i = 0; i < n; i++) {
    if (arr[i] <= k) {
      count++;
    }
  }

  for (int i = 0; i < count; i++) {
    if (arr[i] > k) {
      x++;
    }
  }
  ans = x;
  for (int i = 0, j = count; j < n; i++, j++) {
    if (arr[i] > k) {
      x--;
    }
    if (arr[j] > k) {
      x++;
    }
    ans = min < int > (ans, x);
  }
  return ans;
}
