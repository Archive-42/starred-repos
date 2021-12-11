from ds2viz.element import *
from ds2viz.default_styles import default_styles

class VizNamedReference(HGroup):
    def __init__(self, name, style = '', stylesheet = default_styles):
        # It might make sense to pull out specific features of the
        # style needed here.
        txt = Boxed(Text(name, '_text', stylesheet))
        bpt = Boxed(Circle(5, None, '_point', stylesheet))
        bpt.setwidth(25)
        super().__init__([txt, bpt], style, stylesheet)
        self.setanchor('source', self.elements[1].a('center'))

class VizList(HGroup):
    def __init__(self, L):
        super().__init__([Boxed(Text(str(item))) for item in L])

class VizTree(Group):
    def __init__(self, T):
        super().__init__()
        # Create the pieces
        children = [VizTree(c) for c in T.children]
        root = Circle(18, label = str(T.data))

        # Center the root.
        width = max(sum(c.width for c in children), root.width)
        root.halign('center', (width/2, 0))
        rootcenter = root.a('center')
        self.setanchor('root', rootcenter)

        # Align the subtrees and draw the lines.
        for i, child in enumerate(children):
            if i != 0:
                child.align('left', children[i-1].a('right'))
            child.valign('top', root.a('bottom'))
            self.addelement(Line(rootcenter, child.a('root')))
            self.addelement(child)
        self.addelement(root)

        # It seems to be handy to provide this kind of tree access.
        self.children = children
        self.root = root


class VizBST(Group):
    def __init__(self, n, position = (0,0)):
        super().__init__()
        self.position = position
        self.lefttree = VizBST(n.left) if n.left else Empty()
        self.righttree = VizBST(n.right) if n.right else Empty()
        self.root = Circle(22, label = str(n.key))
        self.root.halign('left', self.lefttree.a('right'))
        self.righttree.halign('left', self.root.a('right'))
        for ch in [self.righttree, self.lefttree]:
            ch.valign('top', self.root.a('bottom'))
        rootcenter = self.root.a('center')
        self.setanchor('root', rootcenter)
        for child in [self.lefttree, self.righttree]:
            if child:
                self.addelement(Line(rootcenter, child.a('root')))
                self.addelement(child)
        self.addelement(self.root)

class VizGraph(Group):
    def __init__(self, graph, points):
        """
        The `points` argument should be a dictionary mapping vertices to
        points.

        The `graph` object must provide iterators `vertices` and `edges` that
        yield the vertices and edges respectively.
        """
        super().__init__()

        for a,b in graph.edges():
            self.addelement(Line(points[a], points[b]))

        for a in graph.vertices():
            # c = Circle(12, a)
            c = Circle(3)
            c.align('center', points[a])
            self.addelement(c)
