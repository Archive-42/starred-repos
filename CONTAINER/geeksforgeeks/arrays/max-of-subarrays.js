const arr = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13];
const k = 4; // sub array size
const n = arr.length;

let max = arr[0]; // initial max
let p = 0;  // sub array size counter
let j = 0;  // i reset counter

const result = [];  // result arr

for (let i = 0; i < n; i++) {
  if (p < k) {
    p++;
  } else {
    p = 0;
    i = j;
    j++;
    result.push(max);
    max = arr[i];
  }
  if (arr[i] > max) {
    max = arr[i];
  }
}

result.push(max);

console.log(result);
