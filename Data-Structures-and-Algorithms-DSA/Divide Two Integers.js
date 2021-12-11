/* Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1].
For this problem, assume that your function returns 231 − 1 when the division result overflows.

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.
*/

var divide = function(dividend, divisor) {
    const retIsNegative = divisor > 0 ^ dividend > 0
    dividend = Math.abs(dividend)
    divisor = Math.abs(divisor)

    let ret = 0
    while (divisor <= dividend) {
        let value = divisor
        let multiple = 1
        while (value + value <= dividend) {
            value += value
            multiple += multiple
        }
        dividend = dividend - value
        ret += multiple
    }

    if (ret > ((2 ** 31) - 1)) {
        return retIsNegative ? -(2 ** 31) : 2 ** 31 - 1
    }
    return retIsNegative ? -ret : ret
};
