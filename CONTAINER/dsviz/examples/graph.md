# A Simple Graph

```python {cmd output="html"}
from ds2.graph import Graph
from ds2viz.datastructures import VizGraph
from ds2viz.canvas import Canvas


vertices = "a40 b55 c92 d77 e00 f29"
edges = "ab bc cd bc ad bf bd ef"
V = {vertex: (int(x)*20+30,int(y)*20+30) for (vertex, x, y) in vertices.split()}

E = edges.split()

G = Graph(V, E)

canvas = Canvas(260, 260)

vizG = VizGraph(G, V)

vizG.draw(canvas)

print(canvas.svgout())


```
