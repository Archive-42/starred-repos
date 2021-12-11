from ds_viz.style import Style

boxstyle = [Style(fill=(1,1,1,0), stroke_width=2.5, stroke=(0,0,0))]

def drawlist(L, position, canvas, style = boxstyle):
    x,y = position
    padding = 4
    height = 26 + 2 * padding
    width = 20

    texty = y + height // 2
    for item in L:
        string = str(item)
        textwidth = width * len(string) + 2 * padding
        textx = x + textwidth//2
        canvas.drawrectangle((x,y), textwidth, height, style)
        canvas.text(string, (textx, texty))
        x += textwidth
