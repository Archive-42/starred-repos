/*Given two arrays: a1[0..n-1] of size n and a2[0..m-1] of size m. Task is to check whether a2[] is a subset of a1[] or not. 
Both the arrays can be sorted or unsorted. It may be assumed that elements in both array are distinct.

Input:
a1[] = {11, 1, 13, 21, 3, 7}
a2[] = {11, 3, 7, 1}
Output:
Yes
Explanation:
a2[] is a subset of a1[]
*/

string isSubset(int a1[], int a2[], int n, int m) {
  int count = 0;
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
      if (a2[i] == a1[j]) {
        count++;
      }
    }
  }
  if (count >= m)
    return "Yes";
  else
    return "No";

}
