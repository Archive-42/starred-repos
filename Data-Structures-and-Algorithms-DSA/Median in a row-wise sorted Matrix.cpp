/* Given a row wise sorted matrix of size RxC where R and C are always odd, find the median of the matrix.

Input:
R = 3, C = 3
M = [[1, 3, 5], 
     [2, 6, 9], 
     [3, 6, 9]]

Output: 5

Explanation:
Sorting matrix elements gives us 
{1,2,3,3,5,6,6,9,9}. Hence, 5 is median. 
*/

int median(vector < vector < int >> & matrix, int r, int c) {

  int midVal = (r * c + 1) / 2;
  int min_val = INT_MAX;
  int max_val = INT_MIN;

  for (int i = 0; i < r; i++) {
    min_val = min(min_val, matrix[i][0]);
    max_val = max(max_val, matrix[i][c - 1]);
  }

  while (min_val < max_val) {
    int mid = min_val + (max_val - min_val) / 2;
    int pos = 0;

    for (int i = 0; i < r; i++)
      pos += upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin();

    if (pos < midVal) {
      min_val = mid + 1;
    } else {
      max_val = mid;
    }
  }
  return min_val;
}
