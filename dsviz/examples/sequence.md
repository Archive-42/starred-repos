# Drawing Sequences

Given a sequence, we'd like to lay it out on a kind of tape.
This is most useful for arrays.

```python {cmd output=html}
from ds2viz.canvas import Canvas
from ds2viz.vizsequence import drawlist

canvas = Canvas()

L = [1,2,3, '\'hello\'', '\'goodbye\'', 234]
drawlist(L, (30, 30), canvas)

L.append('more!')
drawlist(L, (30, 80), canvas)
print(canvas.tohtml())
```

```python {cmd output="html"}
from ds2viz.canvas import Canvas
from ds2viz.element import *
from ds2viz.datastructures import VizList

canvas = Canvas(600, 200)

L = [1,2,3, 'hellooo']
L = VizList(L)
L.position = (1,1)
L.draw(canvas)

print(canvas.svgout())
canvas.pdfsave('shortlist.pdf')
```

<!-- ![A simple list](./list_example.png) -->
