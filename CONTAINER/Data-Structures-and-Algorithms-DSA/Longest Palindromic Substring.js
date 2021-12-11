/* Given a string s, return the longest palindromic substring in s.
Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.
*/

var longestPalindrome = function(s) {
    let maxPal = '';
    
    for(let i = 0; i < s.length; i++) {
        bubble(i, i); // odd palindrome
        bubble(i, i+1); // even palindrome
    }
    
    function bubble(left, right) {

        while(left >= 0 && s[left] === s[right]) {
            left--;
            right++;
        }
        left++;
        right--;
        
        if(maxPal.length < right-left+1) {
            maxPal = s.slice(left, right+1)
        }
    }
    return maxPal;
};
