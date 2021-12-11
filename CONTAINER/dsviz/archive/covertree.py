import math

def lg(x):
    try:
        return math.ceil(math.log(x, 2))
    except ValueError:
        return float('-inf')

class CoverTree:
    def __init__(self, points):
        self.toplevel = float('-inf')
        self.lowestlevel = float('inf')
        self.ch = {}
        P = iter(points)
        self.root = next(P)
        for p in P:
            self.insert(p)

    def insert(self, p):
        # Check if we need to raise the toplevel.
        self.toplevel = max(self.toplevel, lg(p.dist(self.root)))
        # Start at the toplevel of the tree.
        level = self.toplevel
        # Q is the set of potential ancestors.
        Q = {self.root}
        """
        The following loop maintains the invariant that:
            `Q` is a set of point that are close enough at level `level`
            to possibly have the desired parent of `p` as a descendant.

            In terms of distance, this means that `Q` contains every
            point within distance `2 ** (level + 1)` of `p`.

            If any of the points in `Q` are within distance `2 ** level`,
            then they cover `p` and we update `parent`.
            This way, at the end of the loop, `parent` is the point
            corresponding to the lowest node in the tree that can cover `p`.
        """
        while Q:
            # If any point in Q covers p, update the parent.
            # In the first iteration, NN is the root and it becomes the parent.
            NN = min(Q, key = p.dist)
            if NN.dist(p) < 2 ** level:
                parent = NN
            # Move down a level and recover the invariant.
            Q = {q for q in self.allchildren(Q, level)
                        if 0 < q.dist(p) <= 2 ** level}
            level -= 1
        self.addchild(parent, p)

    def nn(self, query, epsilon=0):
        """
        Return the nearest point to the query.

        The paramter epsilon is absolute error in the nearest neighbor search.
        That is, the returned point is within epsilon of the true nearest
        neighbor.

        In the loop, `NN` stores the nearest neighbor found thus far.
        The set `Q` contains all points within distance
        `query.dist(NN) + 2 ** (level + 1)` of `query`.
        """
        Q = {self.root}
        # Determine when to stop the search.
        lowestlevel = max(lg(epsilon), self.lowestlevel)
        # Skipping levels is overrated.
        for level in reversed(range(lowestlevel, self.toplevel + 1)):
            NN = min(Q, key = query.dist)
            # Move down a level and recover the invariant.
            Q = {q for q in self.allchildren(Q, level)
                        if q.dist(query) <= query.dist(NN) + 2 ** level}
        return NN

    def children(self, point, level):
        """ Generate the children of the node `(point, level)`.
        This means that the result can be thought of as points in level
        `level - 1`.

        If there are no children of that node, yield just the point itself.
        """
        yield point
        yield from iter(self.ch.get((point, level), ()))

    def allchildren(self, points, level):
        for p in points:
            yield from self.children(p, level)

    def addchild(self, parent, child):
        level = lg(parent.dist(child))
        # Is this the new lowest node in the tree?
        self.lowestlevel = min(self.lowestlevel, level-1)
        children = self.ch.setdefault((parent, level), set())
        children.add(child)
