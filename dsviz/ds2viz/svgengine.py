import svgwrite
from ds2viz.primitives import *
from ds2viz.imageengine import ImageEngine, styledefaults

def rgbtohex(rgb):
    if rgb is None:
        return 'none'
    colors = [hex(int(x * 255 + 256))[-2:] for x in rgb]
    return "#" + "".join(colors[:3])

class SVGEngine(ImageEngine):
    def __init__(self, canvas, filename = None):
        size = (canvas.width, canvas.height)
        self.svg_doc = svgwrite.Drawing(filename, size)
        super().__init__(canvas, filename)

    def props(self, props, *required_props):
        output = {}
        for prop in required_props:
            if prop not in props:
                props[prop] = styledefaults[prop]
            if prop in ['stroke', 'fill']:
                output[prop] = rgbtohex(props[prop])
            else:
                output[prop] = props[prop]
        return output

    def draw_circle(self, circle):
        props = self.props(circle.props, 'stroke', 'fill', 'stroke_width')
        center = list(circle.center)
        radius = circle.radius
        svgcircle = self.svg_doc.circle(center, r = radius, **props)
        self.svg_doc.add(svgcircle)

    def draw_polyline(self, polyline):
        props = self.props(polyline.props, 'stroke', 'stroke_width', 'fill')
        svgpolyline = self.svg_doc.path(**props)
        points = iter(polyline.points)
        svgpolyline.push("M%f %f" % tuple(next(points)))
        for p in points:
            svgpolyline.push("L%f %f" % tuple(p))
        self.svg_doc.add(svgpolyline)

    def draw_bezier(self, bezier):
        props = self.props(bezier.props, 'stroke', 'stroke_width', 'fill')
        svgbezier = self.svg_doc.path(**props)
        points = iter(bezier.points)
        svgbezier.push("M%f %f" % tuple(next(points)))
        for p in points:
            svgbezier.push("C%f %f" % tuple(p))
            svgbezier.push("%f %f" % tuple(next(points)))
            svgbezier.push("%f %f" % tuple(next(points)))
        self.svg_doc.add(svgbezier)

    def draw_polygon(self, polygon):
        props = self.props(polygon.props, 'stroke', 'stroke_width', 'fill')
        points = polygon.points
        svgpolygon = self.svg_doc.path(**props)
        svgpolygon.push("M%f %f" % tuple(points[0]))
        for p in points:
            svgpolygon.push("L%f %f" % tuple(p))
        svgpolygon.push("Z")
        self.svg_doc.add(svgpolygon)

    def draw_text(self, text):
        props = self.props(text.props,
                           'stroke',
                           'fill',
                           'font_size',
                           'font_family',
                           'font_weight',
                           'dominant_baseline',
                           'text_anchor',
                           )
        svgtext = self.svg_doc.text(text.text, text.position, **props)
        self.svg_doc.add(svgtext)

    def save(self):
        self.svg_doc.save()

    def __str__(self):
        return self.svg_doc.tostring()
