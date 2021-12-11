/* Given a string S, check if it is palindrome or not.

Input: S = "abba"
Output: 1

Input: S = "abc" 
Output: 0
*/

int isPlaindrome(string S) {
  string temp = S;
  reverse(S.begin(), S.end());
  if (temp == S)
    return 1;
  else
    return 0;
}
