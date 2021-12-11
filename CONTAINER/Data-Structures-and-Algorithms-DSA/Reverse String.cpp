/* Write a function that reverses a string. The input string is given as an array of characters s.

Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
*/

 void reverseString(vector < char > & s) {

   int n = s.size();
   for (int i = 0; i < n / 2; i++) {
     swap(s[i], s[n - i - 1]);
   }
 }
