const arr = [19, 3, 56, 8, 21, 5, 30];
const stack = [];

stack.push(arr[0]);
for (let i = 1; i < arr.length; i++) {
  const next = arr[i];
  if (stack.length > 0) {
    let elm = stack.pop();
    while (next > elm) {
      console.log(`${elm} -> ${next}`);
      if (stack.length === 0) {
        break;
      }
      elm = stack.pop();
    }
    if (elm > next) {
      stack.push(elm);
    }
  }
  stack.push(next);
}

while (stack.length > 0) {
  console.log(`${stack.pop()} -> ${-1}`);
}
