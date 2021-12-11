# Design Ideas for `ds2viz`

## We've Moved!

The main design document is now found as part of the documentation in `/docsource/design.rst`.

## Brainstorm

### Margin and Padding

The margin indicates space within the box of an element.
The padding is indicates space outside the box of an element.

Padding should be used exclusively by code that does alignment.

### The figure

A hierarchy of shapes
groups have their own coordinate system
transform an entire group
elements have positions, but also (a dict of) anchors for other elements to interact with.
elements keep track of their width and height

elements can also have tags
transform or style by tags (this allows pushing a tag to the back)

mechanisms for elements in a group to arrange themselves into a bigger picture.

Figures like a list drawn with boxes should be possible without hardcoding the sizes.

### Drawing order

The canvas gets drawn all in one go (in what order?).
DFS with children ordered by creation order.
This might not play nice with z order.
For example, if I was drawing a tree, I might want the subtrees to be their own elements.
This makes it hard to draw all the edges first.

The canvas should manage drawing order.

### Transformations

It is possible to apply a transformation to a group or an individual element.
These include:
- style overrides
- z-order shifting (both relative and absolute)
- translation
- rotation
- scaling (with consideration for strokes)

### Styles

Styles as dictionaries.  
Dealing with defaults
Lists of styles
support z order as a style feature.

Are arrow heads part of the style?

Styles could just be `namedtuples` that start from a default and use the replace method

### Drawing Data Structures

When subclassing a data structure to draw it, it might be better to create an `Exposed` class that provides access to the private members.
Then, the exposed data structure is tested only to see that the assumptions hold.
That is, it uses the exposed attributes and makes sure they behave as expected.

A typical example would be a stack.  There is no way to see inside the stack except the top element.
However, the Exposed version would give access to the list.
One would test the `ExposedStack` by pushing some elements and checking that the exposed list has the right elements in the right order.

Let's favor composition over inheritance.
That way, we can simply wrap the object that we want to use.
I don't know if it's better to reproduce the public interface in the new class, or just access the object.


This idea might be more generally useful, especially if there are special methods that are useful for drawing.
For example, it might make sense to provide an ordered list of attributes of a class, along with their names.

```python {cmd}
class DataStructure:
    def __init__(self, a, b):
        self.a = a
        self._b = b

class ExposedDataStructure:
    def __init__(self, ds):
        self.ds = ds

    @property
    def a(self):
        return self.ds.a

    @property
    def b(self):
        return self.ds._b

    _b = b

from ds2viz.element import Element
class VizDataStructure(Element):
    def __init__(self, ds):
        self.ds = ExposedDataStructure(ds)

    def draw(self, canvas):
        print("pretend this is a drawing")

X = DataStructure(2,3)
Y = ExposedDataStructure(X)
Z = VizDataStructure(X)
# print(Y.b)
print(Z.ds.a, Z.ds.b)
# Z.draw(None)
```
