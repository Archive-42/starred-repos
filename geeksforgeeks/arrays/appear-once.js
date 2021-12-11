const arr = [1, 1, 2, 2, 3, 3, 4, 50, 50, 65, 65];

for (let i = 0; i < arr.length; i += 2) {
  if (arr[i + 1] != arr[i]) {
    console.log(arr[i]);
    break;
  }
}
