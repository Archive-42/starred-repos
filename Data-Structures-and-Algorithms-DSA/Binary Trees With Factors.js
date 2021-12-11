/* Given an array of unique integers, arr, where each integer arr[i] is strictly greater than 1.

We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node's value should be equal to the product of the values of its children.

Return the number of binary trees we can make. The answer may be too large so return the answer modulo 109 + 7.


Input: arr = [2,4]
Output: 3
Explanation: We can make these trees: [2], [4], [4, 2, 2]
*/

var numFactoredBinaryTrees = function(arr) {
    const memo = new Map();
    const mod = 10**9 + 7
    
    arr.sort((a, b) => a - b);
    arr.forEach(num => memo.set(num, 1))
           
    for(let i = 1; i < arr.length; i++) {
        
        for(let j = i-1; j >= 0; j--) {
            
            if(arr[i] % arr[j]) continue; // if the number doesn't divide 
            
            const num2 = arr[i] / arr[j];;
            
            if(!memo.has(num2)) continue; // if the complimentary number doesn't exit
            
            const waysToNum1 = memo.get(arr[j]);
            const waysToNum2 = memo.get(num2);
            const totalWays = waysToNum1 * waysToNum2;
            
            memo.set(arr[i], (memo.get(arr[i]) + totalWays));
        }
    }
    
    const totalTrees = [...memo.values()].reduce((acc, cur) => acc + cur, 0);
    return totalTrees % mod;
};
