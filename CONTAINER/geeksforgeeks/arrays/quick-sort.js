const arr = [19, 3, 56, 8, 21, 5, 30];

function quicksort(arr, low, high) {
  if (low < high) {
    const p = partition(arr, low, high);
    quicksort(arr, low, p - 1);
    quicksort(arr, p + 1, high);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  i++;
  swap(arr, i, high);
  return i;
}

quicksort(arr, 0, arr.length - 1);

console.log(arr);
