/*
Given an array of positive integers. 
Find the length of the longest sub-sequence such that elements in the subsequence are consecutive integers, the consecutive numbers can be in any order.
Input:
N = 7
a[] = {2,6,1,9,4,5,3}
Output:
6
Explanation:
The consecutive numbers here
are 1, 2, 3, 4, 5, 6. These 6 
numbers form the longest consecutive
subsquence.
*/

//Code in JS

findLongestConseqSubseq(nums, N) {

    let m = new Set(nums),
        maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
        let currLen = 1,
            currNum = nums[i];

        if (!m.has(nums[i] - 1)) {
            while (m.has(currNum + 1)) {
                currLen += 1;
                currNum += 1;
            }
        }
        maxLen = Math.max(currLen, maxLen);
    }

    return maxLen;
}
}
