# An SVG Canvas Example

```python {cmd output=html}
from ds_viz.svgcanvas import Canvas
from ds_viz.convexhull import convexhull

P = [[150, 80],
     [10, 10],
     [21, 200],
     [35, 120],
     [250, 80],
    ]

canvas = Canvas(300, 300)
canvas.drawcircle(P[4], 50)
canvas.drawline(P[2], P[1])
canvas.drawpolygon(convexhull(P))
canvas.drawpolygon(P)
for p in P:
  canvas.drawpoint(p)
print(canvas.engine)
```


```python {cmd output=html}
from ds_viz.svgcanvas import Canvas
from ds_viz.vizclustergraph import VizClusterGraph
from ds_viz.style import *
from greedypermutation.point import Point



P = [(150, 80),
     (10, 10),
     (21, 200),
     (35, 120),
     (250, 80),
     (200, 200),
     (180,20),
     (50, 220)
    ]

PC = [Point(p) for p in P]
G = VizClusterGraph(PC)
H = G.heap
root = H.findmax()

# Store the indices of the previous points
index = {root : 0}

for i in range(1,2):
    cluster = H.findmax()
    point = cluster.pop()
    newcluster = G.addcluster(point, cluster)
    index[newcluster] = i
    H.insert(newcluster)


canvas = Canvas(300,300)

# G.drawlocalpacking(canvas, donpolygon)
# G.drawlocalpacking(canvas, [Style(fill=(0.9,0.9,1,1))])
# G.drawtightcover(canvas)
G.drawconvexclusters(canvas)
# G.drawlocalpacking(canvas)
G.drawNNlines(canvas, grayline)
G.drawedges(canvas, blackline)
G.drawvertices(canvas, bigpoint)
G.drawallpoints(canvas, littlepoint)

print(canvas.engine)
```
