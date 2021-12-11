from ds_viz.gizehcanvas import Canvas as PNGCanvas
from ds_viz.style imprt *

class Canvas(PNGCanvas):
    def __init__(self, width = 720, height = 480):
        self.surface = gizeh.PDFSurface(width=width, height=height)
        bg = gizeh.rectangle(lx = width,
                             ly = height,
                             xy=(width//2,height//2),
                             fill=(1,1,1))
        bg.draw(self.surface)
