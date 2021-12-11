```python {cmd output="html"}
from ds2viz.canvas import Canvas
from ds2viz.svgengine import SVGEngine


c = Canvas(600, 480)
c.point((30,30), 'ps')
c.point((50,30), 'doublepoint')
c.circle((100,100), 40, 'stark')
c.rectangle((250,20), 100, 200)
c.line((100,200), (300, 150))
c.polyline([(10,20), (30, 5), (90,20), (200, 3), (150, 30)])
c.bezier([(10,20), (30, 55), (90,20), (100, 130)])
c.text('hello', (140, 300))
print(c.svgout())
# print(c.pdfsave('deleteme.pdf'))
# print(SVGEngine(c))
```

```python {cmd output="html"}
from ds2viz.canvas import Canvas
from ds2viz.svgengine import SVGEngine

c = Canvas(600, 480)
c.bezier([(10,20), (30, 55), (90,20), (100, 130)])
print(c.svgout())
```
