/* Given an array arr[] of N integers, calculate the median.

Example 1:

Input: N = 5
arr[] = 90 100 78 89 67
Output: 89
Explanation: After sorting the array 
middle element is the median 

Example 2:

Input: N = 4
arr[] = 56 67 30 79â€‹
Output: 61
Explanation: In case of even number of 
elemebts average of two middle elements 
is the median
*/

int find_median(vector < int > v) {

  std::sort(v.begin(), v.end());
  int n = v.size();
  if (n % 2 != 0)
    return v[n / 2];
  else {
    return (v[(n - 1) / 2] + v[n / 2]) / 2;
  }
}
