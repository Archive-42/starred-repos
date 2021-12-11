/* Given two sorted arrays arr1 and arr2 of size M and N respectively and an element K. 
The task is to find the element that would be at the k’th position of the final sorted array.

Input:
arr1[] = {2, 3, 6, 7, 9}
arr2[] = {1, 4, 8, 10}
k = 5
Output:
6
Explanation:
The final sorted array would be -
1, 2, 3, 4, 6, 7, 8, 9, 10
The 5th element of this array is 6.
*/


int kthElement(int A[], int B[], int m, int n, int k_req) {
  int k = 0, i = 0, j = 0;

  while (i < m && j < n) {
    if (A[i] < B[j]) {
      k++;
      if (k == k_req)
        return A[i];
      i++;
    } else {
      k++;
      if (k == k_req)
        return B[j];
      j++;
    }
  }

  while (i < m) {
    k++;
    if (k == k_req)
      return A[i];
    i++;
  }

  while (j < n) {
    k++;
    if (k == k_req)
      return B[j];
    j++;
  }
}
