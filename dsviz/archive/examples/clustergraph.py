from ds_viz.gizehcanvas import Canvas
from ds_viz.vizclustergraph import VizClusterGraph
from knottypoints import PC
import moviepy.editor as mpy
from ds_viz.style import *

WHITE = (255, 255, 255)
VIDEO_SIZE = (720, 480)
FRAME_RATE = 3
N = 150
DURATION = N // FRAME_RATE

def image(m):
    canvas = Canvas()

    G = VizClusterGraph(PC)
    H = G.heap
    root = H.findmax()

    # Store the indices of the previous points
    index = {root : 0}

    for i in range(1,m):
        cluster = H.findmax()
        point = cluster.pop()
        newcluster = G.addcluster(point, cluster)
        index[newcluster] = i
        H.insert(newcluster)

    # G.drawlocalpacking(canvas, donpolygon)
    # G.drawlocalpacking(canvas, [Style(fill=(0.9,0.9,1,1))])
    # G.drawtightcover(canvas)
    G.drawconvexclusters(canvas)
    # G.drawlocalpacking(canvas)
    # G.drawNNlines(canvas, grayline)
    G.drawedges(canvas, blackline)
    G.drawvertices(canvas, bigpoint)
    G.drawallpoints(canvas, littlepoint)

    return canvas.surface

def frame(t):
    return image(int(t * FRAME_RATE)).get_npimage()

def makevideo(filename):
    clip = mpy.VideoClip(frame, duration=DURATION)
    video = mpy.CompositeVideoClip([clip], size=VIDEO_SIZE).on_color(color=WHITE, col_opacity=1).set_duration(DURATION)
    video.write_videofile(filename + '.mp4', fps=FRAME_RATE)

# makevideo('localpacking')
image(19).write_to_png("clustergaph.png") # export the surface as a PNG
