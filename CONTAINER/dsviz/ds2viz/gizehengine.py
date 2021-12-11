import gizeh
from ds2viz.primitives import *
from ds2viz.imageengine import ImageEngine, styledefaults

stylerenames = {'font_weight': 'fontweight',
             'font_size' : 'fontsize',
             'font_family' : 'fontfamily',
}

class GizehEngine(ImageEngine):
    def props(self, props, *required_props):
        output = {}
        for prop in required_props:
            if prop not in props:
                props[prop] = styledefaults[prop]
            # TODO: if we switch the color style to hex, this will change.
            # if prop in ['stroke', 'fill']:
            #     output[prop] = hextorgb(props[prop])
            if prop in stylerenames:
                output[stylerenames[prop]] = props[prop]
            else:
                output[prop] = props[prop]
        return output

    def draw_circle(self, circle):
        props = self.props(circle.props, 'stroke', 'fill', 'stroke_width')
        center = list(circle.center)
        radius = circle.radius
        gcircle = gizeh.circle(r = radius, xy = center, **props)
        gcircle.draw(self.surface)

    def draw_polyline(self, polyline):
        props = self.props(polyline.props, 'stroke', 'fill', 'stroke_width')
        points = list(list(p) for p in polyline.points)
        gpolyline = gizeh.polyline(points = points, close_path = False, **props)
        gpolyline.draw(self.surface)

    def draw_polygon(self, polygon):
        props = self.props(polygon.props, 'stroke', 'fill', 'stroke_width')
        points = list(list(p) for p in polygon.points)
        gpolygon = gizeh.polyline(points = points, close_path = True, **props)
        gpolygon.draw(self.surface)

    def draw_bezier(self, bezier):
        props = self.props(bezier.props, 'stroke', 'fill', 'stroke_width')
        # points = list(tuple(p) for p in bezier.points)
        points = bezier.points

        # for i in range(0, len(points) - 1, 3):
        gbezier = gizeh.bezier_curve(points, **props)
        gbezier.draw(self.surface)

    def draw_text(self, text):
        props = self.props(text.props,
                           'stroke',
                           'fill',
                           'font_size',
                           'font_family',
                           'font_weight',
                           # 'dominant_baseline',
                           # 'text_anchor',
                           )
        string = text.text
        gtext = gizeh.text(text.text, xy = text.position, **props)
        gtext.draw(self.surface)



class PNGEngine(GizehEngine):
    def __init__(self, canvas, filename = None):
        self.surface = gizeh.Surface(width=canvas.width,
                                     height=canvas.height)
        super().__init__(canvas, filename)

    def save(self):
        if self.filename is not None:
            self.surface.write_to_png(self.filename)
        else:
            raise RuntimeError("No filename given for canvas.")

    def __str__(self):
        return self.surface.get_html_embed_code()

class PDFEngine(GizehEngine):
    def __init__(self, canvas, filename):
        self.surface = gizeh.PDFSurface(filename,
                                        width=canvas.width,
                                        height=canvas.height)
        super().__init__(canvas, filename)

    def save(self):
        self.surface.finish()
        self.surface.flush()
