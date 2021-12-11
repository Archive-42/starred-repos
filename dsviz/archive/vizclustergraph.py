from ds_viz.convexhull import convexhull
from ds_viz.style import *
from greedypermutation.clustergraph import ClusterGraph

class VizClusterGraph(ClusterGraph):
    def drawvertices(self, canvas, style = bigpoint):
        for v in self.vertices():
            canvas.drawpoint(v.center, style)

    def drawedges(self, canvas, style = blueline):
        for u in self.vertices():
            for v in self.closenbrs(u):
                canvas.drawline(u.center, v.center, style)

    def drawallpoints(self, canvas, style = littlepoint):
        for v in self.vertices():
            for p in v.points:
                canvas.drawpoint(p, style)

    def drawNNlines(self, canvas, style = blackline):
        for v in self.vertices():
            for p in v.points:
                canvas.drawline(v.center, p, style)

    def drawcover(self, canvas, style = blackline):
        radius = max(v.radius for v in self.vertices())
        for v in self.vertices():
            canvas.drawcircle(v.center, radius, style)

    def drawlocalpacking(self, canvas, style = blackline):
        for v in self.vertices():
            radius = min((v.dist(u.center) for u in self.closenbrs(v)
                         if u is not v),
                         default = 0)
            canvas.drawcircle(v.center, radius/2, style)

    def drawtightcover(self, canvas, style = blackline):
        for v in self.vertices():
            canvas.drawcircle(v.center, v.radius, style)

    def drawconvexclusters(self, canvas, style = donpolygon):
        for v in self.vertices():
            ch = convexhull(list(v.points))
            canvas.drawpolygon(ch, style)
