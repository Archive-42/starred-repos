const arr = [19, 3, 56, 8, 21, 5, 30];

function mergesort(arr, low, high) {
  if (low < high) {
    const p = parseInt((low + high - 1) / 2);
    mergesort(arr, low, p);
    mergesort(arr, p + 1, high);
    merge(arr, low, p, high);
  }
}

function merge(arr, low, p, high) {
  const left = [];
  const right = [];
  const n1 = p - low + 1;
  const n2 = high - p;

  for (let i = 0; i < n1; i++) {
    left[i] = arr[low + i];
  }
  for (let i = 0; i < n2; i++) {
    right[i] = arr[p + 1 + i];
  }

  let i = 0;
  let j = 0;
  let k = low;

  while (i < n1 && j < n2) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = left[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = right[j];
    j++;
    k++;
  }
}

mergesort(arr, 0, arr.length - 1);

console.log(arr);
