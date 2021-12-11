def ccw(a,b,c):
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0

def lowerhull(P):
    P.sort(key = lambda p: (p[0], p[1]))
    return grahamscan(P)

def upperhull(P):
    P.sort(key = lambda p: (-p[0], -p[1]))
    return grahamscan(P)

def grahamscan(P):
    stack = []
    for p in P:
        while len(stack) >= 2 and not ccw(stack[-2], stack[-1], p):
            stack.pop()
        stack.append(p)
    return stack

def convexhull(P):
    """ Returns the convex hull of P as a list of points

    The first point is repreated as the last point.
    This makes it easier to draw.
    """
    P = list(P)
    return lowerhull(P)[:-1] + upperhull(P)
