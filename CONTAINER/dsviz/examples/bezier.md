```python {cmd output="html"}

import gizeh

canvas = gizeh.Surface(600, 300)

a = (25,25)
b = (25, 60)
c = (150, 50)
d = (170, 30)
points = [a,b,c,d]

props = {'stroke' : (0,0,0), 'stroke_width' : 2}

for p in points:
  gizeh.circle(r = 2, xy = p, **props).draw(canvas)


bez = gizeh.bezier_curve(points, **props)
bez.draw(canvas)

print(canvas.get_html_embed_code())
print('hello')
```
