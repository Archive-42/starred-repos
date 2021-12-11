```python {cmd output=html}
from ds2viz.canvas import Canvas
from ds2viz.styles import Style

# boxstyle = Style({fill:[1,1,1,0], stroke_width=2.5, stroke=(0,0,0))]
# grid = [Style(fill=(1,1,1), stroke_width=1, stroke=(0.8,0.8,0.8))]

# 17 can be done in 12 starting with 9
# 23 can be done in 13 starting with 13

BIGSIZE = 13
GOAL = 11
STARTBOX = None
if STARTBOX is None:
    BIGGESTBOX = BIGSIZE - 1
else:
    BIGGESTBOX = BIGSIZE - STARTBOX

class Box:
    def __init__(self, x, y, size):
        self.x1 = x
        self.y1 = y
        self.x2 = x + size
        self.y2 = y + size
        self.size = size

    def overlap(self, other):
        return all([self.x1 < other.x2,
                    other.x1 < self.x2,
                    self.y1 < other.y2,
                    other.y1 < self.y2
                  ])

    def fits(self, boxes):
        if self.x2 > BIGSIZE or self.y2 > BIGSIZE:
            return False
        return not any(self.overlap(box) for box in boxes)

    def __contains__(self, item):
        x, y = item
        return  self.x1 <= x < self.x2 and self.y1 <= y < self.y2

    def draw(self, canvas):
        size = self.size * 20
        position = (self.x1 * 20 + 30, self.y1 * 20 + 20)
        canvas.rectangle(position, size, size)

def nextopening(boxes):
    for i in range(BIGSIZE):
        for j in range(BIGSIZE):
            if all((i,j) not in box for box in boxes):
                return (i,j)
    return None, None

def fillitup(boxes):
    i,j = nextopening(boxes)
    if i is None:
        return boxes
    if len(boxes) > GOAL - 1:
        return None
    for size in range(BIGGESTBOX, 0, -1):
        B = set(boxes)
        newbox = Box(i, j, size)
        if newbox.fits(B):
            B.add(newbox)
            newB = fillitup(B)
            if newB is not None:
                return newB
    return None

def drawgrid(canvas):
    for i in range(BIGSIZE):
        for j in range(BIGSIZE):
            Box(i,j,1).draw(canvas)
    Box(0,0, BIGSIZE).draw(canvas)

canvas = Canvas(600, 600)
drawgrid(canvas)

if STARTBOX is None:
    B = []
else:
    BOX2 = BIGSIZE - STARTBOX
    B = [Box(0,0,STARTBOX), Box(0,STARTBOX, BOX2), Box(STARTBOX, 0, BOX2)]
answer = fillitup(B)

if answer is None:
    print("Sorry, dude!")
else:
    for b in answer:
        b.draw(canvas)

print(canvas.svgout())
```
