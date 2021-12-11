// given array
const arr = [19, 3, 56, 8, 21, 5, 30];
// rotation count
let d = 3;
const n = arr.length;

while (d > 0) {
  // take value of first item of arr in temp
  const temp = arr[0];
  // traverse arr from index 1 to length of arr
  for (let i = 1; i < n; i++) {
    // shift arr items by 1 index
    arr[i - 1] = arr[i];
  }
  // assign temp to last index of arr
  arr[n - 1] = temp;
  // decrement rotation count
  d--;
}

console.log(arr);

// output
// [8, 21, 5, 30, 19, 3, 56];
