#
"""Example using weakref.ref to manage a reference to an object.
"""

# end_pymotw_header
import weakref


class ExpensiveObject:
    def __del__(self):
        print("(Deleting {})".format(self))


obj = ExpensiveObject()
r = weakref.ref(obj)

print("obj:", obj)
print("ref:", r)
print("r():", r())

print("deleting obj")
del obj
print("r():", r())
