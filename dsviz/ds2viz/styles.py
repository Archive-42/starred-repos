import yaml

class Style(dict):
    def __or__(self, other):
        output = dict(self)
        output.update(other)
        return Style(output)
        # return Style(**self, **other)
        # TODO: Handle differential settings.

# All other styles build on top of this one.
DEFAULT_STYLE = Style({
    'fontfamily' : 'monospace',
    'fontsize' : '32pt',
    'fill' : (0,0,0),
    'stroke': (0,0,0),
    'stroke_width' : 0,
    'font_weight': 'normal',
    'radius': 4,
    'margin': 0,
    'padding': 0,
})


class StyleSheet:
    def __init__(self, sheet):
        self.styles = {}
        for name, value in sheet.items():
            self.addstyle(name, value)

    def addstyle(self, name, value):
        self.styles[name] = []
        if isinstance(value, list):
            for s in value:
                if isinstance(s, str):
                    self.styles[name].append(s)
                else:
                    self.styles[name].append(Style(s))
        elif isinstance(value, dict):
            self.styles[name].append(Style(value))
        else:
            raise TypeError("Styles must be str, dict, or list.")


    @staticmethod
    def fromyaml(yamlfilename):
        with open(yamlfilename, 'r') as f:
            return StyleSheet(yaml.load(f.read(), Loader=yaml.FullLoader))

    def __getitem__(self, stylename):
        return self.get(stylename, DEFAULT_STYLE, set())

    def __contains__(self, style):
        return style in self.styles

    def get(self, stylename, previous, memo):
        if stylename in memo:
            raise RecursionError("There are stylesheet self-references.")
        memo.add(stylename)
        for s in self.styles[stylename]:
            if isinstance(s, str):
                for ns in self.get(s, previous, memo):
                    yield ns
                    previous = ns
            else:
                if 'base' in s:
                    previous = next(self.get(s['base'], previous, memo))
                previous = previous | s
                yield previous
