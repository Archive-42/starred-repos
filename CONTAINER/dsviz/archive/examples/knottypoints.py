# Let's draw a red circle !
import gizeh
import greedypermutation
from greedypermutation.metricspace import MetricSpace
from greedypermutation.point import Point
from greedypermutation.quadraticgreedy import greedy, greedytree
from math import sin, cos, pi

class PointCloud(MetricSpace):
    def __init__(self, points, xy = (0,0)):
        MetricSpace.__init__(self, points)
        self.center = xy

    def draw(self, surface):
        for p in self:
            drawpoint(p, surface)
            # c = gizeh.circle(r=2, xy=list(p), fill=(1,1,1))
            # c.translate(self.center).draw(surface)

def wavycircle(i, radius, n, lobes = 10, r2 = 30):
    d = i * 2 * pi / n
    lobes = 10
    r = radius + r2 * sin(lobes * d)
    return Point((r*cos(d) + 360, r * sin(d)+ 240))

littlepoint = [(3, (0,0), (0,0,0)), (2, (0,0), (1,1,1))]
bigpoint = [(8, (0,0), (0,0,0)), (7, (0,0), (1,0,0))]

def drawpoint(p, surface, style = littlepoint):
    for r, shift, fill in style:
        center = [p[0] + shift[0], p[1] + shift[1]]
        gizeh.circle(r = r, xy = center, fill = fill).draw(surface)

r = 160
n = 400
r2 = 40
C1 = [wavycircle(i,r,n//2, 9, r2) for i in range(n//2)]
C2 = [wavycircle(i,r,n//2, 9, -r2) for i in range(n//2)]
PC = PointCloud(C1 + C2, (0,0))

if __name__ == "__main__":
    gp = list(greedy(PC))

    surface = gizeh.Surface(width=720, height=480) # in pixels

    m = 18
    for i in range(m):
        drawpoint(gp[i], surface, bigpoint)

    PC.draw(surface)
    surface.write_to_png("wavycircle.png") # export the surface as a PNG
