from ds2viz.styles import StyleSheet, DEFAULT_STYLE
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
default_styles = StyleSheet.fromyaml(dir_path + '/primitive_styles.yaml')
default_styles.addstyle('', DEFAULT_STYLE)
