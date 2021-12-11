function partitionedRecursion(n) {
  if (n > 0) {
    console.log('blocking');
    // If you run the next recursion in a setImmediate
    // you are actually partitioning the task,
    // as it will execute code at the end of the current event loop cycle.
    //
    // From documentation,
    // This code will execute after any I/O operations in the current event loop
    // and before any timers scheduled for the next event loop.
    // This code execution could be thought of as happening "right after this",
    // meaning any code following the setImmediate() function call
    // will execute before the setImmediate() function argument.
    setImmediate(() => partitionedRecursion(n - 1));
  }
}

function recursion(n) {
  if (n > 0) {
    console.log('blocking');
    // Here, the next recursion execution is already happening on current event loop cycle
    // and will block until recursion completes
    recursion(n - 1);
  }
}

setTimeout(() => console.log('hello'), 0);

partitionedRecursion(10);
// recursion(10);

console.log('bye');

// output in case of calling partitionedRecursion(10)
/*
  blocking
  bye
  hello
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
*/

// output in case of calling recursion(10)
/*
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  blocking
  bye
  hello
*/
