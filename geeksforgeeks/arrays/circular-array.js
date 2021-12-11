const arr = [19, 3, 56, 8, 21, 5, 30];

function printCircularArray(arr, n, begin) {
  for (let i = begin; i < n + begin; i++) {
    console.log(arr[i % n]);
  }
}

printCircularArray(arr, arr.length, 3);
