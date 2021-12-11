# 2021-02-27_A-Quick-Guide-to-Big-O-Notation--Memoization--Tabulation--and-Sorting-Algorithms-by-Example-803ff193c522

# A Quick Guide to Big-O Notation, Memoization, Tabulation, and Sorting Algorithms by Example

Curating Complexity: A Guide to Big-O Notation

---

### A Quick Guide to Big-O Notation, Memoization, Tabulation, and Sorting Algorithms by Example

![https://cdn-images-1.medium.com/max/800/0*yjlSk3T9c2_14in1.png](https://cdn-images-1.medium.com/max/800/0*yjlSk3T9c2_14in1.png)

**_Curating Complexity: A Guide to Big-O Notation_**

**[Medium-article-comp-complex\***A Node.js repl by bgoonz\*replit.com](https://replit.com/@bgoonz/Medium-article-comp-complex)

- Why is looking at runtime not a reliable method of calculating time complexity?
- Not all computers are made equal( some may be stronger and therefore boost our runtime speed )
- How many background processes ran concurrently with our program that was being tested?
- We also need to ask if our code remains performant if we increase the size of the input.
- The real question we need to answering is: `How does our performance scale?`.

### big ‘O’ notation

- Big O Notation is a tool for describing the efficiency of algorithms with respect to the size of the input arguments.
- Since we use mathematical functions in Big-O, there are a few big picture ideas that we’ll want to keep in mind:
- The function should be defined by the size of the input.
- `Smaller` Big O is better (lower time complexity)
- Big O is used to describe the worst case scenario.
- Big O is simplified to show only its most dominant mathematical term.

### Simplifying Math Terms

- We can use the following rules to simplify the our Big O functions:
- `Simplify Products` : If the function is a product of many terms, we drop the terms that don't depend on n.
- `Simplify Sums` : If the function is a sum of many terms, we drop the non-dominant terms.
- `n` : size of the input
- `T(f)` : unsimplified math function
- `O(f)` : simplified math function.

`Putting it all together`

![https://cdn-images-1.medium.com/max/800/1*TT8uuv1x3nmGUw5rvtoZ8A.png](https://cdn-images-1.medium.com/max/800/1*TT8uuv1x3nmGUw5rvtoZ8A.png)

- First we apply the product rule to drop all constants.
- Then we apply the sum rule to select the single most dominant term.

---

### Complexity Classes

Common Complexity Classes

### There are 7 major classes in Time Complexity

![https://cdn-images-1.medium.com/max/800/1*6zKhmJoHkvDbrd8jfUDf3A.png](https://cdn-images-1.medium.com/max/800/1*6zKhmJoHkvDbrd8jfUDf3A.png)

### `O(1) Constant`

> The algorithm takes roughly the same number of steps for any input size.

### `O(log(n)) Logarithmic`

> In most cases our hidden base of Logarithmic time is 2, log complexity algorithm’s will typically display ‘halving’ the size of the input (like binary search!)

### `O(n) Linear`

> Linear algorithm’s will access each item of the input “once”.

### `O(nlog(n)) Log Linear Time`

> Combination of linear and logarithmic behavior, we will see features from both classes.

> Algorithm’s that are log-linear will use both recursion AND iteration.

### `O(nc) Polynomial`

> C is a fixed constant.

### `O(c^n) Exponential`

> C is now the number of recursive calls made in each stack frame.

> Algorithm’s with exponential time are VERY SLOW.

---

### Memoization

- Memoization : a design pattern used to reduce the overall number of calculations that can occur in algorithms that use recursive strategies to solve.
- MZ stores the results of the sub-problems in some other data structure, so that we can avoid duplicate calculations and only ‘solve’ each problem once.
- Two features that comprise memoization:

1. FUNCTION MUST BE RECURSIVE.
2. Our additional Data Structure is usually an object (we refer to it as our memo… or sometimes cache!)

![https://cdn-images-1.medium.com/max/800/1*4U79jBMjU2wKE_tyYcD_3A.png](https://cdn-images-1.medium.com/max/800/1*4U79jBMjU2wKE_tyYcD_3A.png)

![https://cdn-images-1.medium.com/max/800/1*Qh42KZgcCxmVt6WrTasCVw.png](https://cdn-images-1.medium.com/max/800/1*Qh42KZgcCxmVt6WrTasCVw.png)

### Memoizing Factorial

Our memo object is _mapping_ out our arguments of factorial to it’s return value.

- Keep in mind we didn’t improve the speed of our algorithm.

### Memoizing Fibonacci

[https://cdn-images-1.medium.com/max/800/0\*2XaPj7UGKZYFjYhb](https://cdn-images-1.medium.com/max/800/0*2XaPj7UGKZYFjYhb)

- Our time complexity for Fibonacci goes from O(2^n) to O(n) after applying memoization.

### The Memoization Formula

> Rules:

1. _Write the unoptimized brute force recursion (make sure it works);_
2. _Add memo object as an additional argument ._
3. _Add a base case condition that returns the stored value if the function’s argument is in the memo._
4. _Before returning the result of the recursive case, store it in the memo as a value and make the function’s argument it’s key._

### Things to remember

1. _When solving DP problems with Memoization, it is helpful to draw out the visual tree first._
2. _When you notice duplicate sub-tree’s that means we can memoize._

---

### Tabulation

### Tabulation Strategy

> Use When:

- **The function is iterative and not recursive.**
- _The accompanying DS is usually an array._

### Steps for tabulation

- _Create a table array based off the size of the input._
- _Initialize some values in the table to ‘answer’ the trivially small subproblem._
- _Iterate through the array and fill in the remaining entries._
- _Your final answer is usually the last entry in the table._

---

### Memo and Tab Demo with Fibonacci

> Normal Recursive Fibonacci

```
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

> Memoization Fibonacci 1

> Memoization Fibonacci 2

> Tabulated Fibonacci

### Example of Linear Search

- _Worst Case Scenario: The term does not even exist in the array._
- _Meaning: If it doesn’t exist then our for loop would run until the end therefore making our time complexity O(n)._

---

### Sorting Algorithms

### Bubble Sort

`Time Complexity`: Quadratic O(n^2)

- The inner for-loop contributes to O(n), however in a worst case scenario the while loop will need to run n times before bringing all n elements to their final resting spot.

`Space Complexity`: O(1)

- Bubble Sort will always use the same amount of memory regardless of n.

[https://cdn-images-1.medium.com/max/800/0\*Ck9aeGY-d5tbz7dT](https://cdn-images-1.medium.com/max/800/0*Ck9aeGY-d5tbz7dT)

- The first major sorting algorithm one learns in introductory programming courses.
- Gives an intro on how to convert unsorted data into sorted data.

> It’s almost never used in production code because:

- _It’s not efficient_
- _It’s not commonly used_
- _There is stigma attached to it_
- `Bubbling Up` *: Term that infers that an item is in motion, moving in some direction, and has some final resting destination.*
- _Bubble sort, sorts an array of integers by bubbling the largest integer to the top._
- _Worst Case & Best Case are always the same because it makes nested loops._
- _Double for loops are polynomial time complexity or more specifically in this case Quadratic (Big O) of: O(n²)_

### Selection Sort

`Time Complexity`: Quadratic O(n^2)

- Our outer loop will contribute O(n) while the inner loop will contribute O(n / 2) on average. Because our loops are nested we will get O(n²);

`Space Complexity`: O(1)

- Selection Sort will always use the same amount of memory regardless of n.

[https://cdn-images-1.medium.com/max/800/0\*AByxtBjFrPVVYmyu](https://cdn-images-1.medium.com/max/800/0*AByxtBjFrPVVYmyu)

- Selection sort organizes the smallest elements to the start of the array.

[https://cdn-images-1.medium.com/max/800/0\*GeYNxlRcbt2cf0rY](https://cdn-images-1.medium.com/max/800/0*GeYNxlRcbt2cf0rY)

> Summary of how Selection Sort should work:

1. _Set MIN to location 0_
2. _Search the minimum element in the list._
3. _Swap with value at location Min_
4. _Increment Min to point to next element._
5. _Repeat until list is sorted._

### Insertion Sort

`Time Complexity`: Quadratic O(n^2)

- Our outer loop will contribute O(n) while the inner loop will contribute O(n / 2) on average. Because our loops are nested we will get O(n²);

`Space Complexity`: O(n)

- Because we are creating a subArray for each element in the original input, our Space Comlexity becomes linear.

[https://cdn-images-1.medium.com/max/800/0\*gbNU6wrszGPrfAZG](https://cdn-images-1.medium.com/max/800/0*gbNU6wrszGPrfAZG)

### Merge Sort

`Time Complexity`: Log Linear O(nlog(n))

- Since our array gets split in half every single time we contribute O(log(n)). The while loop contained in our helper merge function contributes O(n) therefore our time complexity is O(nlog(n)); `Space Complexity`: O(n)
- We are linear O(n) time because we are creating subArrays.

[https://cdn-images-1.medium.com/max/800/0\*GeU8YwwCoK8GiSTD](https://cdn-images-1.medium.com/max/800/0*GeU8YwwCoK8GiSTD)

[https://cdn-images-1.medium.com/max/800/0\*IxqGb72XDVDeeiMl](https://cdn-images-1.medium.com/max/800/0*IxqGb72XDVDeeiMl)

### Example of Merge Sort

[https://cdn-images-1.medium.com/max/800/0\*HMCR--9niDt5zY6M](https://cdn-images-1.medium.com/max/800/0*HMCR--9niDt5zY6M)

- **Merge sort is O(nlog(n)) time.**
- _We need a function for merging and a function for sorting._

> Steps:

1. _If there is only one element in the list, it is already sorted; return the array._
2. _Otherwise, divide the list recursively into two halves until it can no longer be divided._
3. _Merge the smallest lists into new list in a sorted order._

### Quick Sort

`Time Complexity`: Quadratic O(n^2)

- Even though the average time complexity O(nLog(n)), the worst case scenario is always quadratic.

`Space Complexity`: O(n)

- Our space complexity is linear O(n) because of the partition arrays we create.
- QS is another Divide and Conquer strategy.
- Some key ideas to keep in mind:
- It is easy to sort elements of an array relative to a particular target value.
- An array of 0 or 1 elements is already trivially sorted.

[https://cdn-images-1.medium.com/max/800/0\*WLl_HpdBGXYx284T](https://cdn-images-1.medium.com/max/800/0*WLl_HpdBGXYx284T)

[https://cdn-images-1.medium.com/max/800/0\*-LyHJXGPTYsWLDZf](https://cdn-images-1.medium.com/max/800/0*-LyHJXGPTYsWLDZf)

### Binary Search

`Time Complexity`: Log Time O(log(n))

`Space Complexity`: O(1)

[https://cdn-images-1.medium.com/max/800/0\*-naVYGTXzE2Yoali](https://cdn-images-1.medium.com/max/800/0*-naVYGTXzE2Yoali)

> Recursive Solution

> Min Max Solution

- _Must be conducted on a sorted array._
- _Binary search is logarithmic time, not exponential b/c n is cut down by two, not growing._
- _Binary Search is part of Divide and Conquer._

### Insertion Sort

- **Works by building a larger and larger sorted region at the left-most end of the array.**

> Steps:

1. _If it is the first element, and it is already sorted; return 1._
2. _Pick next element._
3. _Compare with all elements in the sorted sub list_
4. _Shift all the elements in the sorted sub list that is greater than the value to be sorted._
5. _Insert the value_
6. _Repeat until list is sorted._

### If you found this guide helpful feel free to checkout my GitHub/gists where I host similar content:

**[bgoonz’s gists\***Instantly share code, notes, and snippets. Web Developer, Electrical Engineer JavaScript | CSS | Bootstrap | Python |…\*gist.github.com](https://gist.github.com/bgoonz)

**[bgoonz — Overview\***Web Developer, Electrical Engineer JavaScript | CSS | Bootstrap | Python | React | Node.js | Express | Sequelize…\*github.com](https://github.com/bgoonz)

### Or Checkout my personal Resource Site:

**[Web-Dev-Hub\***Memoization, Tabulation, and Sorting Algorithms by Example Why is looking at runtime not a reliable method of…\*bgoonz-blog.netlify.app](https://bgoonz-blog.netlify.app/)

![https://cdn-images-1.medium.com/max/800/1*VCmj_H9AHs41oC9Yx1hZFQ.png](https://cdn-images-1.medium.com/max/800/1*VCmj_H9AHs41oC9Yx1hZFQ.png)

### Discover More:

**[Web-Dev-Hub\***Memoization, Tabulation, and Sorting Algorithms by Example Why is looking at runtime not a reliable method of…\*bgoonz-blog.netlify.app](https://bgoonz-blog.netlify.app/)

By [Bryan Guner](https://medium.com/@bryanguner) on [February 27, 2021](https://medium.com/p/803ff193c522).

[Canonical link](https://medium.com/@bryanguner/a-quick-guide-to-big-o-notation-memoization-tabulation-and-sorting-algorithms-by-example-803ff193c522)

Exported from [Medium](https://medium.com/) on August 10, 2021.
