/*Given an array Arr of N positive integers. Your task is to find the elements whose value is equal to that of its index value.

Input: 
N = 5
Arr[] = {15, 2, 45, 12, 7}
Output: 2
Explanation: Only Arr[2] = 2 exists here.

*/

vector < int > valueEqualToIndex(int arr[], int n) {
  vector < int > ar;
  for (int i = 0; i < n; i++) {
    if (arr[i] == i + 1) {
      ar.insert(ar.end(), {
        arr[i]
      });
    }

  }
  return ar;
}
