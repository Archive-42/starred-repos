from collections import namedtuple

# The Drawing Primitives
DP_Circle = namedtuple('Circle', ['center', 'radius', 'props'])
DP_Polyline = namedtuple('PolyLine', ['points', 'props'])
DP_Bezier = namedtuple('Bezier', ['points', 'props'])
DP_Polygon = namedtuple('Polygon', ['points', 'props'])
DP_Text = namedtuple('Text', ['text', 'position', 'props'])
