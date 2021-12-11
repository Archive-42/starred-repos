/* You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:

    difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
    worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).

Every worker can be assigned at most one job, but one job can be completed multiple times.

    For example, if three workers attempt the same job that pays $1, then the total profit will be $3. If a worker cannot complete any job, their profit is $0.

Return the maximum profit we can achieve after assigning the workers to the jobs.

Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get a profit of [20,20,30,30] separately.
*/

var maxProfitAssignment = function(difficultyArr, profitArr, workerArr) {
     let jobMap = Array.from(difficultyArr, (x,i) => [profitArr[i], x])
    jobMap.sort((a,b) => b[0] - a[0]); workerArr.sort((a,b) => b - a)
    let totalProfit = 0
    let j = 0, w = 0
    while(j < jobMap.length && w < workerArr.length){
        let [profit, difficulty] = jobMap[j],
            worker = workerArr[w]
        if(difficulty > worker)j++
        else{
            totalProfit += profit
            w++
        }
        
    }
    return totalProfit
};
