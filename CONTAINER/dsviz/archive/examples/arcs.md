```python {cmd output=html}
import gizeh

s = gizeh.Surface(720, 480)

a = gizeh.arc(30, 0, 1.5, stroke=(0,0,0), stroke_width=2, xy=(100,200))

a.draw(s)
print(s.get_html_embed_code())
```
