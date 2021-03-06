May 20th, 2019

Parts of this series:

1.  Spying on Functions and Changing their Implementation
2.  [Taking Advantage of the Module System](https://silvenon.com/blog/mocking-with-jest/modules/)

---

Jest has **lots** of mocking features. For a long time I’ve been using only a small subset of them, but with experience I was able to gain a deeper understanding of these features. Now I want to share that knowledge with you because it has been incredibly useful to me.

This can be an intimidating area for beginners, especially because at the time of this writing the Jest documentation on this subject is a bit spotty. Add to that the fact that the term “mock” is ambiguous; it can refer to functions, modules, servers etc. I would like to help you get familiar not only with mocking features in Jest, but these testing concepts in general.

---

Mock functions, are powerful and have many purposes—we can create new dummy functions, spy on existing functions, temporarily change their implementation, pass them around… usually in order to eventually make assertions on them, directly or indirectly.

## Spying

Let’s start with the most basic example. I assume you already know [how to set up Jest](https://jestjs.io/docs/en/getting-started)? Good. Let’s open a test file:

```
const fn = jest.fn()
```

This is a dummy function. We can call it, but nothing seems to happen.

```
fn()
fn({ meaningOfLife: 42 })
console.log(fn())
```

However, if we inspect the function itself, we’ll notice that it’s no ordinary function:

```
console.log(fn)





```

For example, let’s inspect its `mock` property:

```
console.log(fn.mock.calls)

```

Looks familiar? It appears that the mock function has been recording our calls! Don’t panic, not phone calls, just function calls. This means that we can make assertions on this function, but instead of making assertions on the `mock` property directly, we can use special Jest matchers for mock functions:

```
test('mock function has been called with the meaning of life', () => {
  const fn = jest.fn()
  fn(42)
  expect(fn).toHaveBeenCalledWith(42)
})
```

But this test is silly, we already know that the function will be called with `42` because _we_ called it within the test itself. Mock functions are mostly useful for passing to the source code that we’re testing, then we expect that code to call it in a certain way. For example:

```
const MontyPython = require('./monty-python')




describe('MontyPython', () => {
  describe('callFnWithTheMeaningOfLife', () => {
    it('calls given function with the meaning of life', () => {
      const montyPython = new MontyPython()
      const fn = jest.fn()
      montyPython.callFnWithTheMeaningOfLife(fn)
      expect(fn).toHaveBeenCalledWith(42)
    })
  })
})
```

But what if meaning of life isn’t 42? Life is never that simple, things often don’t happen for a reason, they’re just random, and it’s on us to try to make the best of it. ❤️

Now that we had this life-changing epiphany, let’s create a new method which returns a more honest answer, i.e. `Math.random()`:

```
module.exports = class MontyPython {
  getTheMeaningOfLife() {
    return Math.random() * 100
  }
}
```

That’s more like it. In real life you rarely get a clean 42, usually you get something like 19.513179535940452 and you have to roll with it.

Now let’s adjust our test. Now we want to check whether `Math.random` has been called. We can’t just replace `Math.random` with a mock function because we want to preserve its functionality, instead we can spy on it using `jest.spyOn`, which wraps it in a mock function and returns it so we can track it:

```
const MontyPython = require('./monty-python')

describe('MontyPython', () => {
  describe('getTheMeaningOfLife', () => {
    it('reveals the cold hard truth about life', () => {
      const montyPython = new MontyPython()
      const mathRandomSpy = jest.spyOn(Math, 'random')
      montyPython.getTheMeaningOfLife()
      expect(mathRandomSpy).toHaveBeenCalled()
      mathRandomSpy.restore()
    })
  })
})
```

Here `Math.random` does its thing, we’re not changing its functionality, we’re only temporarily wrapping it in a mock function in order to make assertions on it. Then at the end of the test we’re removing the wrapper because we no longer need it.

## Changing implementation

Keep in mind that testing is about _purpose_, we’ll usually want to test overall functionality, not details like whether built-ins like `Math.random` were called. To do this we’ll probably want to change `Math.random`’s behavior in order to be able to test a larger piece of functionality. This is where the `mockImplementation` method comes in.

Let’s say that the head of the [Ministry of Silly Walks](https://youtu.be/KCrQu0VTUBs) wanted to add a method for plotting their walking pattern as an array of steps using left and right legs:

```
module.exports = class MontyPython {
  getSillyWalk(numberOfSteps) {
    const steps = []
    for (let i = 0; i < numberOfSteps; i++) {
      if (steps[steps.length - 1] !== 'left') {
        steps.push('left')
      } else {
        steps.push('right')
      }
    }

    return steps.sort(() => 0.5 - Math.random())
  }
}
```

We would like to test this walk using Jest snapshots, but since it’s random our tests will fail. We can’t test whether the generated walk is in fact silly, we can only test whether it’s technically a walk, meaning that it consists of a series of steps for each leg. To do this we’ll alter the behavior of `Math.random` using the `mockImplementation` method to always return `0.5` in order to prevent shuffling the array (if the `sort` method returns `0`, order is preserved):

```
const MontyPython = require('./monty-python')

describe('MontyPython', () => {
  describe('getSillyWalk', () => {
    it('returns a series of steps for each leg', () => {
      const montyPython = new MontyPython()
      const mathRandomSpy = jest.spyOn(Math, 'random')
      mathRandomSpy.mockImplementation(() => 0.5)
      expect(montyPython.getSillyWalk(6)).toMatchSnapshot()
      mathRandomSpy.restore()
    })
  })
})
```

Now when we run our tests, the following deterministic snapshot will be saved:

```
exports[`MontyPython getSillyWalk returns a series of steps for each leg 1`] = `
Array [
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
]
`;
```

Notice that we didn’t make assertions on the spy itself, we just temporarily altered `Math.random`’s behavior so we can make a predictable assertion on the code that it was _affecting_.

Now, since our codebase is split across files, let’s start exploring mocking in the context of _modules_.

## Conclusion

It took me a long time to understand the nuances of these features, how to get what I want and how to even _know_ what I want. I encourage you to scroll through the [`expect` reference](https://jestjs.io/docs/en/expect) to learn more about these features and how they compare to the ones that I didn’t cover in this post. If you catch yourself making assertions on the `mock` property directly, try to see if there’s already a built-in matcher for the assertion you’re looking for, maybe also combining them with utilities like [`expect.objectContaining`](https://jestjs.io/docs/en/expect#expectobjectcontainingobject). This has the benefit of being more readable and having a better error message if your test fails.

I hope that this post brought you some clarity on the subject, have fun building better tests!

---

What about modules? See how you can mock modules on different levels by [taking advantage of the module system](https://silvenon.com/blog/mocking-with-jest/modules).

---
