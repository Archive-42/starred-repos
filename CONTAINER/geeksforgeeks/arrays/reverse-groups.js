const arr = [19, 3, 56, 8, 21, 5, 30];
const n = arr.length;

const g = 2; // group size

let p = 0;
let i = 0;
let j = g - 1;
// possible groups in arr for provided group size
const possibleWholeGroups = parseInt(n/g);

while (p < possibleWholeGroups) {
  reverseByIteration(arr, i, j);
  i += g;
  j += g;
  p++;
}

console.log(arr);

function reverseByIteration(arr, i, j) {
  while (i < j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  }
}
