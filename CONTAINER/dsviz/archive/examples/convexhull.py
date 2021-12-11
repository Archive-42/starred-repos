import gizeh
from convexhull import convexhull
from knottypoints import PC
from vizclustergraph import drawpolygon, drawpoint
from greedypermutation.clarksongreedy import greedy

# gp = list(greedy(PC))

P = sorted(list(PC), key = lambda p:p[0])[:50]
ch = convexhull(P)
surface = gizeh.Surface(width=720, height=480) # in pixels

# gizeh.polyline(points=[list(p) for p in ch], stroke_width = 2, stroke = (1,1,1)).draw(surface)
drawpolygon(ch, surface)
for p in P:
    drawpoint(p, surface)

surface.write_to_png("convexhullexample.png") # export the surface as a PNG
