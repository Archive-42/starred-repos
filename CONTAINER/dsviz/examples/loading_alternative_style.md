```python {cmd output="html"}
from ds2viz.styles import StyleSheet
from ds2viz.canvas import Canvas
from ds2viz.element import *

ss = StyleSheet.fromyaml('alt_styles.yaml')

c = Canvas(600, 300, ss)

b =Circle(5)
b.position = (20, 20)
b.draw(c)

box = Boxed(Text('hello'), 'otherbox', ss)
box2 = Boxed(Text('in the middle'), 'otherbox', ss)
box3 = Boxed(Text('goodbye'), 'otherbox', ss)
G = VGroup([box, box2, box3])
G.draw(c)
# box.drawbox(c)
G.drawbox(c)
# box2.drawbox(c)
print(c.svgout())
```
