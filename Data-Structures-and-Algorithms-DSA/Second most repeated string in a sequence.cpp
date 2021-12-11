/* Given a sequence of strings, the task is to find out the second most repeated (or frequent) string in the given sequence.

Note: No two strings are the second most repeated, there will be always a single string.

Input:
N = 6
arr[] = {aaa, bbb, ccc, bbb, aaa, aaa}
Output: bbb
Explanation: "bbb" is the second most 
occurring string with frequency 2.
*/


string secFrequent(string seq[], int n) {

  unordered_map < string, int > occ;
  for (int i = 0; i < n; i++)
    occ[seq[i]]++;

  int first_max = INT_MIN, sec_max = INT_MIN;
  for (auto it = occ.begin(); it != occ.end(); it++) {
    if (it -> second > first_max) {
      sec_max = first_max;
      first_max = it -> second;
    } else if (it -> second > sec_max &&
      it -> second != first_max)
      sec_max = it -> second;
  }

  for (auto it = occ.begin(); it != occ.end(); it++)
    if (it -> second == sec_max)
      return it -> first;
}
