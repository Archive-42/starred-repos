/* Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] 
is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
*/

var dailyTemperatures = function(T) {
    var len = T.length;
    if (!len) return [];
    var result = new Array(len).fill(0);
    var max = T[len - 1];
    for (var i = len - 2; i >= 0; i--) {
        if (T[i] < T[i + 1]) {
            result[i] = 1;
        } else if (T[i] >= max) {
            result[i] = 0;
            max = T[i];
        } else {
            var idx = i + 1;
            while (result[idx]) {
                idx += result[idx];
                if (T[idx] > T[i]) {
                    result[i] = idx - i;
                    break;
                }
            }
        }
    }
    return result;
};
