from ds2viz.primitives import *

styledefaults = {'radius': 3,
                 'fill': (1,1,1),
                 'stroke': (0,0,0),
                 'stroke_width' : 0,
                 'font_size': 24,
                 'font_family' : 'monospace',
                 'font_weight': 'normal',
                 'text_anchor' : 'middle',
                 'dominant_baseline' : 'central',
                }

class ImageEngine:
    def __init__(self, canvas, filename = None):
        self.filename = filename
        for p in canvas.primitives():
            if isinstance(p, DP_Circle):
                self.draw_circle(p)
            elif isinstance(p, DP_Polyline):
                self.draw_polyline(p)
            elif isinstance(p, DP_Polygon):
                self.draw_polygon(p)
            elif isinstance(p, DP_Text):
                self.draw_text(p)
            elif isinstance(p, DP_Bezier):
                self.draw_bezier(p)
            else:
                raise TypeError('The drawing primitive has an unknown type.')
