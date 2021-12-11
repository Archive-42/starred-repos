```python {cmd output="html"}
from ds2viz.element import *
from ds2viz.canvas import Canvas
from ds2viz.vector import Vector

atext = Text('top')
a = Boxed(atext)
btext = Text('middle')
b = Boxed(btext)
c = Boxed(Text('bottom'))
d = Boxed(Text('other!'))
# g = VGroup([HGroup([a,b]), c])
e = VGroup([a,b,c])
f = HGroup([e, d])
g = VGroup([Boxed(Text(str(i))) for i in range(0,70,24)] + [f])
canvas = Canvas(600,400)
g.position = Vector(200,100)
g.draw(canvas)
# atext.drawanchors(canvas)

line = Line(Vector(40, 50), Vector(130, 200))
# line.position = Vector(100, 100)
line.draw(canvas)
line.drawanchors(canvas)

print(canvas.svgout())
```
