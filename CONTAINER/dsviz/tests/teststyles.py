import unittest
from ds2viz.styles import Style, StyleSheet, DEFAULT_STYLE


SS = {'red': {'stroke': (1,0,0), 'margin': 1},\
      'shadow':
        [
          {'stroke': (0.3, 0.3, 0.3), 'radius': 10, 'stroke_width': 2},
          {'stroke': (0.5, 0.5, 0.5), 'stroke_width': 5},
        ],
       'blueshadow':
        [
          {'stroke': (0,0,1), 'fill' : (1,1,1)},
          'shadow',
        ],
       'newred': {'base': 'red', 'margin' : 10}
      }

class TestStyleSheet(unittest.TestCase):
    def testinit_simple_inherits_default_style(self):
        sheet  = StyleSheet(SS)
        red = next(sheet['red'])
        self.assertEqual(red['stroke'], (1, 0, 0))
        self.assertEqual(red['stroke_width'], DEFAULT_STYLE['stroke_width'])
        self.assertEqual(red['fill'], DEFAULT_STYLE['fill'])
        self.assertNotEqual(red['stroke'], DEFAULT_STYLE['stroke'])

    def testinit_list_inherits_default_style(self):
        sheet  = StyleSheet(SS)
        shadow = list(sheet['shadow'])
        self.assertEqual(len(shadow), 2)
        self.assertEqual(shadow[0]['stroke'], (0.3, 0.3, 0.3))
        self.assertEqual(shadow[0]['fill'], DEFAULT_STYLE['fill'])
        self.assertEqual(shadow[1]['stroke'], (0.5, 0.5, 0.5))
        self.assertEqual(shadow[1]['fill'], DEFAULT_STYLE['fill'])

    def testinit_list_inherits_from_predecessor(self):
        sheet  = StyleSheet(SS)
        shadow = list(sheet['shadow'])
        self.assertNotEqual(shadow[0]['radius'], DEFAULT_STYLE['radius'])
        self.assertEqual(shadow[0]['radius'], 10)
        self.assertEqual(shadow[1]['radius'], 10)


    def test_get_resolving_strings_as_names(self):
        sheet = StyleSheet(SS)
        bs = list(sheet['blueshadow'])
        self.assertEqual(len(bs), 3)
        self.assertEqual(bs[0]['stroke'], (0, 0, 1))
        self.assertEqual(bs[1]['stroke'], (0.3, 0.3, 0.3))
        self.assertEqual(bs[2]['stroke'], (0.5, 0.5, 0.5))
        self.assertNotEqual(bs[0]['fill'], DEFAULT_STYLE['fill'])
        self.assertEqual(bs[0]['fill'], bs[1]['fill'])
        self.assertEqual(bs[0]['fill'], bs[2]['fill'])
        self.assertEqual(bs[1]['radius'], bs[2]['radius'])

    def testinit_with_base_names(self):
        sheet = StyleSheet(SS)
        red = next(sheet['red'])
        newred = next(sheet['newred'])
        self.assertEqual(red['stroke'], newred['stroke'])
        self.assertNotEqual(red['margin'], newred['margin'])

if __name__ == '__main__':
    unittest.main()
