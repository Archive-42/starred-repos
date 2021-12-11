# Drawing Binary Search Trees

Let's draw a binary search tree.  It should have the property that the left to right ordering of the nodes corresponds to the inorder traversal.



```python {cmd output="html"}
from ds2.orderedmapping import BSTMapping as BST
from ds2viz.datastructures import VizBST
from ds2viz.canvas import Canvas

T = BST()
for i in [7,2,1,4,3,6,11,9,10,8]:
    T[i] = i

canvas = Canvas(600, 400)
mytree = VizBST(T._root, (20, 10))
mytree.draw(canvas)
# mytree.left.drawanchors(canvas)

from ds2viz.gizehengine import GizehEngine

print(canvas.pngout())
# canvas.pdfsave('bst.pdf')
# canvas.pngsave('bst.png')
```

---

We should be able to highlight the path taken by a search.

Here is the old way. (These imports don't even exist anymore.)

```python
from ds2viz.gizehcanvas import Canvas
from ds2viz.vizbst import drawtree, drawpathtoroot
from ds2.orderedmapping import BSTMapping as BST

canvas = Canvas(height= 200)

T = BST()
for i in [7,2,1,4,3,6,11,12,9,10,8]:
    T[i] = None

drawpathtoroot(T, 2.5, canvas)
drawtree(T, canvas)

print(canvas.tohtml())
```

This is not yet implemented in the new system.


## Some features to add

- **Draw an entire subtree as a triangle.**
