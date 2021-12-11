from ds2.orderedmapping import BSTMapping as BST
from ds_viz.style import Style

def x(node, offset):
	nodewidth = 40
	lenleft = len(node.left) if node.left is not None else 0
	return nodewidth * (lenleft + 1) + offset

# textstyle = {"stroke_width" : "0", "stroke" : "black",
#             "fill" : "black", "fill_opacity" : "1",
#             "font_size" : "20pt"}

nodestyle = [Style(radius = 18, stroke= (0,0,0), stroke_width=2, fill=(1,1,1))]
nodelabel = [Style(fontfamily='monospace', fontsize=20, fill=(0,0,0))]
treeedge =  [Style(stroke=(0,0,0), stroke_width=2)]
highlight = [Style(stroke=(0.9,0.9,0.3), stroke_width=20)]

def drawtree(T, canvas):
	if isinstance(T, BST): T = T._root
	drawsubtree(T, 0, 20, canvas)

def drawsubtree(T, xoffset, yoffset, canvas):
	if T is None: return
	radius = 18
	levelheight = 50
	a,b = x(T, xoffset), yoffset
	c = yoffset + levelheight
	if T.left is not None and len(T.left) > 0:
		canvas.drawline((a, b), (x(T.left, xoffset), c), treeedge)
		drawsubtree(T.left, xoffset, c, canvas)
	if T.right is not None and len(T.right) > 0:
		canvas.drawline((a, b), (x(T.right, a), c), treeedge)
		drawsubtree(T.right, a, c, canvas)
	canvas.drawcircle((a, b), radius, nodestyle)
	canvas.text(T.key, (a, b), nodelabel)

def drawpathtoroot(T, key, canvas):
    if isinstance(T, BST):
        T = T._root
    _drawpathtoroot(T, key, 0, 20, canvas)


def _drawpathtoroot(T, key, xoffset, yoffset, canvas):
    if T is None: return
    levelheight = 50
    a,b = x(T, xoffset), yoffset
    c = yoffset + levelheight
    if key < T.key and T.left is not None:
        canvas.drawline((a, b), (x(T.left, xoffset), c), highlight)
        _drawpathtoroot(T.left, key, xoffset, c, canvas)
    elif key > T.key and T.right is not None:
        canvas.drawline((a, b), (x(T.right, a), c), highlight)
        _drawpathtoroot(T.right, key, a, c, canvas)
