/* Given an array of strings words representing an English Dictionary, return the longest word in words that can be built one character at a time by other words in words.

If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.

Input: words = ["w","wo","wor","worl","world"]
Output: "world"
Explanation: The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".
*/

var longestWord = function(words) {
    words.sort()
    const wordSet = new Set(words)
    let res = ''
    for (const w of words) {
        let isValid = true
        let key = ''
        for (let i = 0; i < w.length - 1; i++) {
            key += w[i]
            if (!wordSet.has(key)) {
                isValid = false
                break;
            }
        }
        if (isValid && w.length > res.length) {
            res = w
        }
    }
    return res
};
