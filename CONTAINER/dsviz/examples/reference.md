```python {cmd output="html"}
from ds2viz.datastructures import *
from ds2viz.element import Circle
from ds2viz.canvas import Canvas
from ds2viz.vector import Vector

canvas = Canvas(600, 300)
key = VizNamedReference('key')
value = Boxed(Text('value'))
# a = Circle(24)
# props = {'stroke' : (0,0,0), 'stroke_width' : 5}
# c = VizList([1,2,3])
key.position = (40, 150)
value.position = (300,100)
# c.draw(canvas)
# a.draw(canvas)
# x.draw(canvas)
# a.elements[1].drawanchors(canvas)
# .drawanchors(canvas)
fig = Group([key, value])

fig.addelement(SCurve(fig.a(key, 'source'), fig.a(value, 'left')))
fig.draw(canvas)

# canvas.bezier([start, u, v, end])

print(canvas.svgout())
```
