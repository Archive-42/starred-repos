/*The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

    countAndSay(1) = "1"
    countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), which is then converted into a different digit string.

To determine how you "say" a digit string, split it into the minimal number of groups so that each group is a contiguous section all of the same character. 
Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and 
concatenate every saying.

Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = say "1" = one 1 = "11"
countAndSay(3) = say "11" = two 1's = "21"
countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"
*/

//Code in JS
var countAndSay = function(n) {
    if (n === 1) return '1';
    return say(countAndSay(n - 1));
}

var say = function(str) {
    let sayStr = '';
    for (var i = 0; i < str.length;) {
        let count = 1;
        for (var j = i; j < str.length; j += 1) {
            if (str[j] === str[j + 1]) {
                count += 1;
            } else {
                sayStr += count + str[j];
                i = j + 1;
                break;
            }
        }
    }
    return sayStr;
}
