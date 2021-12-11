const arr = [19, 3, 56, 8, 21, 5, 30];
const n = arr.length;

const lastElm = arr[n-1];
let max = lastElm;

console.log('Leaders->');
console.log(lastElm);

for (let i = n-2; i >= 0; i--) {
  if (arr[i] > max) {
    max = arr[i];
    console.log(max);
  }
}
