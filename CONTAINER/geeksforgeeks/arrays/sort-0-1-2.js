const array = [2, 0, 1, 1, 2, 0, 2, 0, 0, 1];

// counting number of 1s, 2s and deducing num 0s
// then re-fill arr with 0s, 1s, 2s in asc order
function approach1(arr) {
  let num1s = 0;
  let num2s = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      num1s++;
    } else if (arr[i] === 2) {
      num2s++;
    }
  }
  const num0s = arr.length - num1s - num2s;
  for (let i = 0; i < arr.length; i++) {
    if (i < num0s) {
      arr[i] = 0;
    } else if (i < (num0s + num1s)) {
      arr[i] = 1;
    } else {
      arr[i] = 2;
    }
  }
  return arr;
}

// Dutch flag problem
function approach2(arr) {
  
}

console.log(approach1(array));
