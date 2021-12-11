from ds2viz.vector import Vector
from ds2viz.default_styles import default_styles
from collections import defaultdict, namedtuple

Box = namedtuple('Box', ['top', 'right', 'bottom', 'left'])

class Element:
    def __init__(self, style = '', stylesheet = default_styles, xy=(0,0)):
        self._position = Vector(xy)
        self._box = Box(0, 0, 0, 0)
        self.anchor = defaultdict(Vector)
        self.tags = set()
        self.stylesheet = stylesheet
        self.style = style
        self.parent = None
        self.padding = float(next(stylesheet[style])['padding'])
        self.margin = float(next(stylesheet[style])['margin'])

    @property
    def position(self):
        return self._position

    @position.setter
    def position(self, x, y = None):
        self._position = Vector(x, y)

    @property
    def _top(self):
        return self._box.top

    @property
    def _right(self):
        return self._box.right

    @property
    def _bottom(self):
        return self._box.bottom

    @property
    def _left(self):
        return self._box.left

    @property
    def top(self):
        return self._top + self.position.y

    @property
    def right(self):
        return self._right + self.position.x

    @property
    def bottom(self):
        return self._bottom + self.position.y

    @property
    def left(self):
        return self._left + self.position.x

    @property
    def width(self):
        return self._right - self._left

    @property
    def height(self):
        return self._bottom - self._top

    def globalposition(self):
        if self.parent is None:
            return self.position
        else:
            return self.position + self.parent.globalposition()

    def setanchor(self, label, v):
        self.anchor[label] = Vector(v)

    def _align(self, anchor, point):
        return Vector(point) - self._a(anchor)

    def align(self, anchor, point):
        self.position = self._align(anchor, point)

    def valign(self, anchor, point):
        self.position.y = self._align(anchor, point).y

    def halign(self, anchor, point):
        self.position.x = self._align(anchor, point).x

    def setwidth(self, width):
        t, r, b, l = self._box
        dwidth = width - self.width
        self._box = Box(t, r + dwidth, b, l)

    def setheight(self, height):
        t, r, b, l = self._box
        dheight = height - self.height
        self._box = Box(t, r, b + dheight, l)

    def drawbox(self, canvas):
        position = self.globalposition()
        anchors = ['top', 'right', 'bottom', 'left', 'topleft', 'topright',
                   'bottomleft', 'bottomright', 'center']
        lines = [('topleft', 'topright'),
                 ('topright', 'bottomright'),
                 ('bottomright', 'bottomleft'),
                 ('bottomleft', 'topleft')]
        for start, end in lines:
            canvas.line(position + self._a(start), position + self._a(end))
        for anchor in anchors:
            canvas.point(position + self._a(anchor))

    def _a(self, anchor):
        verticalcenter = (self._top + self._bottom) / 2
        horizontalcenter = (self._left + self._right) / 2
        self.setanchor('top', (horizontalcenter, self._top))
        self.setanchor('topright', (self._right, self._top))
        self.setanchor('right',(self._right, verticalcenter))
        self.setanchor('bottomright', (self._right, self._bottom))
        self.setanchor('bottom', (horizontalcenter, self._bottom))
        self.setanchor('bottomleft', (self._left, self._bottom))
        self.setanchor('left', (self._left, verticalcenter))
        self.setanchor('topleft', (self._left, self._top))
        self.setanchor('center', (horizontalcenter, verticalcenter))
        return self.anchor[anchor]

    def a(self, anchor):
        return self.position + self._a(anchor)

class Text(Element):
    def __init__(self, text, style = '_text', stylesheet = default_styles):
        super().__init__()
        self.style = style
        self.text = text
        # The size will depend on the fontfamily and size.
        self._box = Box(0, 17 * len(text), 30, 0)

    def draw(self, canvas):
        pos = self.globalposition() + self._a('center')
        canvas.text(self.text, pos, self.style)

class Empty(Element):
    def __init__(self):
        super().__init__()

    def draw(self, canvas):
        pass

    def __bool__(self):
        return False

class Boxed(Element):
    def __init__(self,
                 element,
                 style = '_polygon',
                 stylesheet = default_styles):
        super().__init__(style, stylesheet)
        self.element = element
        self.style = style
        element.parent = self
        vshift = max(self.margin, element.padding)
        hshift = max(self.margin, element.padding)
        self._box = Box(0,
                        element.width + 2 * hshift,
                        element.height + 2 * vshift,
                        0)
        self.alignelement()

    def draw(self, canvas):
        topleft = self.globalposition() + self._a('topleft')
        canvas.rectangle(topleft,
                             self.width,
                             self.height,
                             self.style
                             )
        self.element.draw(canvas)

    def alignelement(self):
        self.element.align('center', self._a('center'))

    def setwidth(self, width):
        super().setwidth(width)
        self.alignelement()

    def setheight(self, width):
        super().setheight(width)
        self.alignelement()

class Circle(Element):
    def __init__(self, radius = 20, label = None, style = '_circle', stylesheet = default_styles):
        super().__init__(style, stylesheet)
        margin = 5
        size = 2 * (radius + margin)
        self._box = Box(0, size, size, 0)
        if label is not None:
            self.label = Text(str(label))
            self.label.parent = self
            self.label.align('center', self._a('center'))
        else:
            self.label= None
        self.radius = radius

    def draw(self, canvas):
        center = self.globalposition() + self._a('center')
        canvas.circle(center, self.radius, self.style)
        if self.label is not None:
            self.label.draw(canvas)

class Line(Element):
    def __init__(self, a, b, style = '_path', stylesheet = default_styles):
        super().__init__(style, stylesheet)
        start = Vector(a)
        end = Vector(b)
        self._box = Box(min(start.y, end.y),
                        max(start.x, end.x),
                        max(start.y, end.y),
                        min(start.x, end.x)
                       )
        self.setanchor('start', start)
        self.setanchor('end', end)

    def draw(self, canvas):
        pos = self.globalposition()
        a = pos + self._a('start')
        b = pos + self._a('end')
        canvas.line(a, b, self.style)

class SCurve(Line):
    def draw(self, canvas):
        right = Vector(60, 0)
        pos = self.globalposition()
        a = pos + self._a('start')
        b = pos + self._a('end')
        u = a + right
        v = b - right
        canvas.bezier([a, u, v, b])

class Group(Element):
    def __init__(self,
                 elements = (),
                 style = '',
                 stylesheet = default_styles):
        super().__init__()
        self.elements = []
        for e in elements:
            self.addelement(e)

    def alignelements(self, anchor1, anchor2, gapvector = Vector(0,0)):
        for i in range(1, len(self.elements)):
            e0 = self.elements[i-1]
            e1 = self.elements[i]
            gap = gapvector * max(e0.padding, e1.padding)
            e1.align(anchor1, e0.a(anchor2) + gap)

    def draw(self, canvas):
        for e in self.elements:
            e.draw(canvas)

    def addelement(self, element):
        self.elements.append(element)
        element.parent = self

    @property
    def _top(self):
        return min(e.top for e in self)

    @property
    def _right(self):
        return max(e.right for e in self)

    @property
    def _bottom(self):
        return max(e.bottom for e in self)

    @property
    def _left(self):
        return min(e.left for e in self)

    def __len__(self):
        return len(self.elements)

    def __iter__(self):
        return iter(self.elements)

class HGroup(Group):
    def __init__(self, elements, style = '', stylesheet = default_styles):
        super().__init__(elements, style, stylesheet)
        for e in self.elements:
            e.setheight(self.height)
        self.alignelements('left', 'right', Vector(1,0))

class VGroup(Group):
    def __init__(self, elements, style = '', stylesheet = default_styles):
        super().__init__(elements, style, stylesheet)
        for e in self.elements:
            e.setwidth(self.width)
        self.alignelements('top', 'bottom', Vector(0, 1))
