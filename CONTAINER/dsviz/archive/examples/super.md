# using `super()`

```python {cmd}
class A:
    def foo(self, x):
        print(str(type(self))[1:-1])
        print(self.bar(x))

    def bar(self, x):
        return 'OOOPs'

class B(A):
    def foo(self, x):
        super().foo(x)
        print('Done.')

    def bar(self, x):
        return 'Okay.'

b = B()
b.foo(2)
```
