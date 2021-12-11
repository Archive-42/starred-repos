/* Sometimes people repeat letters to represent extra feeling, such as "hello" -> "heeellooo", "hi" -> "hiiii".  In these strings like "heeellooo", we have groups of adjacent 
letters that are all the same:  "h", "eee", "ll", "ooo".

For some given string s, a query word is stretchy if it can be made to be equal to s by any number of applications of the following extension operation: choose a group 
consisting of characters c, and add some number of characters c to the group so that the size of the group is 3 or more.

For example, starting with "hello", we could do an extension on the group "o" to get "hellooo", but we cannot get "helloo" since the group "oo" has size less than 3.  
Also, we could do another extension like "ll" -> "lllll" to get "helllllooo". 
If s = "helllllooo", then the query word "hello" would be stretchy because of these two extension operations: query = "hello" -> "hellooo" -> "helllllooo" = s.

Given a list of query words, return the number of words that are stretchy. 

Input: 
s = "heeellooo"
words = ["hello", "hi", "helo"]
Output: 1
Explanation: 
We can extend "e" and "o" in the word "hello" to get "heeellooo".
We can't extend "helo" to get "heeellooo" because the group "ll" is not size 3 or more.
*/

var expressiveWords = function(S, words) {
    function count(str, i) {
    let start = i;
    while (i + 1 < str.length) {
      if (str[i] !== str[i + 1]) break;
      i++;
    }
    return i - start + 1;
  }
  
  function isStretchy(w) {
    let i = 0, j = 0;
    while (i < w.length && j < S.length) {
      if (w[i] !== S[j]) return false;
      let countA = count(w, i);
      let countB = count(S, j);
      if (countA > countB || (countA < countB && countB < 3)) {
        return false;
      }
      i += countA;
      j += countB;
    }
    return i == w.length && j == S.length;
  }
  
  let ans = 0;
  words.forEach(w => {
    if (isStretchy(w)) ans++;
  });
  return ans;
};
