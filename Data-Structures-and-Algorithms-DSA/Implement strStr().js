/* Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Input: haystack = "hello", needle = "ll"
Output: 2
*/

var strStr = function(haystack, needle) {
    if (!needle.length) return 0;

    const searchStr = haystack.indexOf(needle);

    if (searchStr === -1) return -1;

    if (searchStr === 0 || searchStr) return searchStr;
};
