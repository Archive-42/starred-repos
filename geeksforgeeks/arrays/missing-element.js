// given array of consecutive numbers
const arr = [1, 2, 3, 4, 5, 7];
// find the missing number
const len = arr.length;
// formula [ n (n + 1) / 2 ]
// since given arr is missing one number, hence arr has n - 1 elements
const n = len + 1;
const totalSum = n * (n + 1) / 2;
const arrSum = arr.reduce((acc, i) => acc + i, 0);
const missingElement = totalSum - arrSum;

console.log(`Missing element: ${missingElement}`);
