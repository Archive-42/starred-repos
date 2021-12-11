/*Given an array Arr that contains N integers (may be positive, negative or zero). 
Find the product of the maximum product subarray.
Input:
N = 5
Arr[] = {6, -3, -10, 0, 2}
Output: 180
Explanation: Subarray with maximum product
is  6, -3, -10 which gives product as 180.
*/

long long maxProduct(int * arr, int n) {
  long long product = arr[0];
  long long minimum = arr[0];
  long long maximum = arr[0];

  for (int i = 1; i < n; i++) {
    if (arr[i] < 0) {
      swap(minimum, maximum);
    }
    maximum = max((long long) arr[i], maximum * arr[i]);
    minimum = min((long long) arr[i], minimum * arr[i]);

    if (maximum > product) {
      product = maximum;
    }
  }
  return product;
}
