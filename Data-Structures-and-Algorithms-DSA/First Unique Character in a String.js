/*Given a string s, return the first non-repeating character in it and return its index. If it does not exist, return -1.

Input: s = "leetcode"
Output: 0
*/


var firstUniqChar = function(s) {
    
   for (let i = 0; i < s.length; ++i) 
       if (s.indexOf(s[i]) === s.lastIndexOf(s[i]))
           return i;
  return -1;
};
