// traverse arr from eiter side increasing partition size +1 
function findEquilibrium(arr) {
  let i = 1;
  let j = arr.length - 2;
  const start = 0;
  const end = arr.length;
  
  while (i <= j) {
    if (checkSumEitherSides(arr, start, end, i)) {
      printEquilibrium(arr, i);
      break;

    } else if (checkSumEitherSides(arr, start, end, j)) {
      printEquilibrium(arr, j);
      break;
    }
    i ++;
    j --;
  }
}

// calculates sum of array from both partitions and compares equality
function checkSumEitherSides(arr, start, end, i) {
  let sumLeft = sum(arr, start, i);
  let sumRight = sum(arr, i + 1, end);
  return sumLeft === sumRight;
}

// computes sum or arr for given indexes
function sum(arr, begin, end) {
  let sum = 0;
  for (let i = begin; i < end; i++) {
    sum += arr[i];
  }
  return sum;
}

function printEquilibrium(arr, i) {
  console.log(`Equilibrium: ${arr[i]} at index ${i}`);
}

const arr = [1, 3, 5, 6, 2, 2, 13];

findEquilibrium(arr);
