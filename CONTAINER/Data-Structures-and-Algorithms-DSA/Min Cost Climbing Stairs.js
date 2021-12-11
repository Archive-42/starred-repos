/* You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.

Input: cost = [10,15,20]
Output: 15
Explanation: Cheapest is: start on cost[1], pay that cost, and go to the top.
*/

var minCostClimbingStairs = function(cost) {
    let minCostOneDown = cost[1];
    let minCostTwoDown = cost[0];

    for (let i = 2; i < cost.length; i++) {
        const currStair = cost[i] + Math.min(minCostOneDown, minCostTwoDown);
        minCostTwoDown = minCostOneDown;
        minCostOneDown = currStair;
    }

    return Math.min(minCostOneDown, minCostTwoDown);
};
