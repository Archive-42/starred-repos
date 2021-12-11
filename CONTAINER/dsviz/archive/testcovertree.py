import unittest
from greedypermutation import Point
from covertree import CoverTree

class TestCoverTree(unittest.TestCase):
    def testconstruction(self):
        """
                            a = 0
                          /       \
                    c = -19       b = 20
                                 /
                               d = 15

        """
        a,b,c,d = [Point([x]) for x in [0, 20, -19, 15]]
        T = CoverTree([a,b,c,d])
        self.assertEqual(T.root, a)
        self.assertTrue(b in T.children(a, 5))
        self.assertTrue(c in T.children(a, 5))
        self.assertTrue(d not in T.children(a, 5))
        self.assertTrue(c not in T.children(a, 4))
        self.assertEqual(set(T.ch), {(a,5),(b,3)})

    def testnnsearch(self):
        coords = [200, -190, 57, 40, 20, 10, 170, 100,195, -50, -30, 340, -120, -230, 310, 300, -300]
        P = [Point([x]) for x in coords]
        T = CoverTree(P)
        for query in range(-300, 300, 1):
            q = Point([query])
            nn1 = T.nn(q)
            nn2 = min(P, key = q.dist)
            assert nn1.dist(q) == nn2.dist(q)

    def testinsertduplicate(self):
        coords = [0, 200, 300, 200]
        P = [Point([x]) for x in coords]
        T = CoverTree(P)


if __name__ == '__main__':
    unittest.main()
