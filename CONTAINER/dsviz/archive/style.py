class Style:
    def __init__(self, *, fontsize = 12, fontfamily='serif', radius=2, offset=(0,0), fill=(0,0,0,0), stroke=(0,0,0,0), stroke_width=1):
        self.fontsize = fontsize
        self.fontfamily = fontfamily
        self.radius = radius
        self.offset = offset
        self.fill = fill
        self.stroke = stroke
        self.stroke_width = stroke_width

    def copy(self):
        return Style(radius = self.radius,
                     offset = self.offset,
                     fill = self.fill,
                     stroke = self.stroke,
                     stroke_width = self.stroke_width)


lineshadow = [Style(stroke_width=13-i, stroke=(1-0.05 * i,1-0.05 * i,1-0.05 * i)) for i in range(10)]
jeffeline = lineshadow + [Style(stroke_width = 3, stroke=(1,1,1))]
redline =[Style(stroke_width=2, stroke=(1,0,0))]
blueline =[Style(stroke_width=2, stroke=(0.3,0.3,1))]
grayline =[Style(stroke_width=2, stroke=(0.7,0.7,0.7))]
blackline =[Style(stroke_width=2, stroke=(0,0,0), fill=(1,1,1))]
littlepoint = [Style(radius=3, fill=(0,0,0)), Style(radius=2, fill=(1,1,1))]
blackpoint = [Style(radius=4, fill=(0,0,0))]
bigpoint = [Style(radius=8, fill=(0,0,0)), Style(radius=7, fill=(1,0,0))]
donpolygon = [Style(stroke_width=4, stroke=(0,0,0), fill=(1,1,1))]

monospace30 = [Style(fontfamily = 'monospace', fontsize=30, fill = (0,0,0))]
