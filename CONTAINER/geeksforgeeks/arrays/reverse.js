const array = [19, 3, 56, 8, 21, 5, 30];

// iterative approach
function reverseByIteration(arr) {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  }
  return arr;
}

// recursive approach
function reverseByRecursion(arr, i, j) {
  if (i >= j) {
    return arr;
  }
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return reverseByRecursion(arr, i + 1, j - 1);
}

console.log(reverseByIteration(array));
console.log(reverseByRecursion(array, 0, array.length - 1));
