from ds_viz.style import *
from ds_viz.svghelper import SVGEngine

def rgbtohex(rgb):
    colors = [hex(int(x * 255 + 256))[-2:] for x in rgb]
    return "#" + "".join(colors[:3])

class Canvas:
    def __init__(self, width = 720, height = 480):
        self.engine = SVGEngine(width, height)
        # self.surface = gizeh.Surface(width=width, height=height)
        self.engine.draw_rect((0, 0), width, height)

    def drawpoint(self, p, style = littlepoint):
        for s in style:
            center = [p[0] + s.offset[0], p[1] + s.offset[0]]
            self.engine.draw_circle(center = center,
                                    radius = s.radius,
                                    fill = rgbtohex(s.fill))

    def drawcircle(self, p, radius, style = blackline):
        for s in style:
            self.engine.draw_circle(center = list(p),
                                    radius = radius,
                                    stroke_width = s.stroke_width,

                                    fill = rgbtohex(s.fill),
                                    stroke=rgbtohex(s.stroke)
                                    )

    def drawline(self, a, b, style = redline):
        for s in style:
            self.engine.draw_line(list(a), list(b),
                                  stroke_width=s.stroke_width,
                                  stroke=rgbtohex(s.stroke)
                                  )

    def drawpolygon(self, points, style = donpolygon):
        for s in style:
            self.engine.draw_polygon(points,
                                     stroke_width = s.stroke_width,
                                     # fill = "#fffff0",
                                     fill = rgbtohex(s.fill),
                                     stroke=rgbtohex(s.stroke)
                                    )

    def drawrectangle(self, xy, width, height, style = donpolygon):
        x, y = xy
        self.drawpolygon([(x, y),
                          (x + width, y),
                          (x + width, y + height),
                          (x, y + height),
                          (x, y)
                          ])

    def text(self, string, position, style = monospace30):
        string = str(string)
        for s in style:
            textstyle = {'fill': 'black',
                         'stroke_width': 0,
                         'font_size': '24pt',
                         'font_family' : 'monospace',
                         'font_weight': 'bold'}
            self.engine.draw_text_center(string, position, **textstyle)

    def tohtml(self):
        print(str(self.engine))
