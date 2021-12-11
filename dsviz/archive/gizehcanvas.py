import gizeh
from ds_viz.style import *

class Canvas:
    def __init__(self, width = 720, height = 480):
        self.surface = gizeh.Surface(width=width, height=height)
        bg = gizeh.rectangle(lx = width,
                             ly = height,
                             xy=(width//2,height//2),
                             fill=(1,1,1))
        bg.draw(self.surface)

    def drawpoint(self, p, style = littlepoint):
        for s in style:
            center = [p[0] + s.offset[0], p[1] + s.offset[0]]
            point = gizeh.circle(r = s.radius,
                                 xy = center,
                                fill = s.fill)
            point.draw(self.surface)

    def drawcircle(self, p, radius, style = blackline):
        for s in style:
            circle = gizeh.circle(r = radius,
                                  xy = list(p),
                                  fill = s.fill,
                                  stroke_width = s.stroke_width,
                                  stroke=s.stroke)
            circle.draw(self.surface)

    def drawline(self, a, b, style = redline):
        for s in style:
            line = gizeh.polyline(points=[list(a), list(b)],
                                  stroke_width=s.stroke_width,
                                  stroke=s.stroke)
            line.draw(self.surface)

    def drawrectangle(self, topleft, width, height, style = donpolygon):
        top, left = topleft
        bottom, right = topleft[0] + width, topleft[1] + height
        corners = [
                   (top, left),
                   (top, right),
                   (bottom, right),
                   (bottom, left),
                  ]
        self.drawpolygon(corners, style)

    def drawpolygon(self, points, style = donpolygon):
        P = list(points)
        if P[0] != P[-1]:
            P.append(P[0])
        for s in style:
            polygon = gizeh.polyline(points=[list(p) for p in P],
                                     stroke_width = s.stroke_width,
                                     stroke = s.stroke,
                                     fill=s.fill)
            polygon.draw(self.surface)

    def text(self, string, position, style = monospace30):
        string = str(string)
        for s in style:
            text = gizeh.text(string,
                              s.fontfamily,
                              s.fontsize,
                              fill = s.fill,
                              xy = position,
                              )
            text.draw(self.surface)

    def tohtml(self):
        return self.surface.get_html_embed_code()
