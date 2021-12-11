import pyglet
from ds2viz.primitives import *
from ds2viz.imageengine import ImageEngine, styledefaults


class PygletEngine(ImageEngine):
    def __init__(self, canvas, filename = None):
        size = (canvas.width, canvas.height)
        self.batch = pyglet.graphics.Batch()
        super().__init__(canvas, filename)
