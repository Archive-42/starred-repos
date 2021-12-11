/* Given a sorted array arr containing n elements with possibly duplicate elements, 
the task is to find indexes of first and last occurrences of an element x in the given array.

Input:
n=9, x=5
arr[] = { 1, 3, 5, 5, 5, 5, 67, 123, 125 }
Output:  2 5
Explanation: First occurrence of 5 is at index 2 and last
             occurrence of 5 is at index 5. 
*/

vector < int > find(int arr[], int n, int x) {

  vector < int > ar;
  int first = -1, last = -1;
  for (int i = 0; i < n; i++) {
    if (arr[i] == x) {
      if (first == -1)
        first = i;
      last = i;
    }
  }
  ar.insert(ar.begin(), {first});
  ar.insert(ar.begin() + 1, {last});
  return ar;
}
