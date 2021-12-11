/* You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
*/

var maxProfit = function(prices, fee) {
    let dp = {}
    function iterate(buy, index) {
        if(index === prices.length){
            return 0
        }
        if(dp[`${buy}-${index}`]) {
            return dp[`${buy}-${index}`]
        }
        let profit = 0
        if(buy) {
            dp[`${buy}-${index}`] = Math.max(
             iterate(false, index+1) + prices[index],
             iterate(buy, index+1)   
            )
        }
        else {
            dp[`${buy}-${index}`] = Math.max(
                iterate(buy, index+1),
                iterate(true, index+1) - prices[index] - fee
            )
        }
        return dp[`${buy}-${index}`]
    }
    return iterate(false, 0)
};
