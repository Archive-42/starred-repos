# import gizeh
from greedypermutation.point import Point
from ds_viz.style import *
# from vizclustergraph import drawpoint, drawline
from ds_viz.covertree import CoverTree
from ds_viz.gizehcanvas import Canvas

coords = [3,180, 200, -190, 57, 40, 20, 10, 170, 100,195, -50, -30, 340, -120, -230, 310, 300, -300]
P = [Point([x]) for x in coords]
label = {p: coords[i] for i,p in enumerate(P)}
T = CoverTree(P)
tree = {(label[p], level): {label[q] for q in ch}
            for ((p,level), ch) in T.ch.items()}

canvas = Canvas()
# surface = gizeh.Surface(width=720, height=480) # in pixels
# gizeh.rectangle(lx=720, ly=480, xy=(360,240), fill=(1,1,1)).draw(surface)

def nodepos(p, level):
    return Point([p+ 360, 480 - level*50])

drawimplicit = True
if drawimplicit:
    for ((p,level), ch) in tree.items():
        ch |= {p}
        for q in ch:
            q_pt = nodepos(q, level-1)
            # Draw the implcit tree
            canvas.drawline(q_pt, nodepos(q, 1), grayline)
            for i in range(1,level):
                canvas.drawpoint(nodepos(q, i), littlepoint)

for ((p,level), ch) in tree.items():
    p_pt = nodepos(p, level)
    canvas.drawpoint(p_pt, blackpoint)
    for q in ch:
        q_pt = nodepos(q, level-1)
        canvas.drawline(p_pt, q_pt, blackline)
        canvas.drawpoint(q_pt, blackpoint)

for query in range(-300, 300, 1):
    q = Point([query])
    nn1 = T.nn(q)
    nn2 = min(P, key = q.dist)
    assert nn1.dist(q) == nn2.dist(q)
# nn = label[nn1]
# nn_pt = nodepos(nn, 0.8)
# q_pt = nodepos(query, 0.8)
# drawline(nn_pt, q_pt, surface, redline)
# drawpoint(nn_pt, surface, blackpoint)
# drawpoint(q_pt, surface, blackpoint)

canvas.surface.write_to_png("covertree.png")
