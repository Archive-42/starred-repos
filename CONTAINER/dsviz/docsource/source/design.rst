Design Principles
=================

Goals
-----

I want a library that makes it easy to generate vector graphics figures using Python.

It should have a good list of primitives: point, line, circle, rectangle, polygon, text, etc.

It should be able to support a robust style mechanism.

It should be able to easily compose figures into larger figures.

It should be able to output to many formats, thinly wrapping around other libraries so as to not be too dependent on any one of them.


Primitive Shapes
----------------

These primitive shapes are created via methods on the Canvas.

- point
- text
- paths
  - line
  - polyline
  - circular arc
  - bezier curve
- shapes
  - circle
  - ellipse
  - rectangle
  - polygon

The primitives are mapped to a much smaller number of Drawing Primitives that are processed by the Image Engines:

- circle (change to ellipse?)
- polyline
- bezier
- polygon
- text

Canvases
--------

A canvas provides the drawing primitives and has the ability to write output as a string or to a file.

The canvas interface provides methods for drawing the primitives.

A style string is passed to the primitives.

The canvas stores a dictionary of styles associated with strings.

The canvas buffers all the primitives that are drawn and attempts to order them by z-order (which may be part of the style).

Figure Elements
---------------

An element is a shape or a group of elements.
Every element has
- a parent element (except for the root)
- a style
- a coordinate system
- a position in the parent's coordinate system
- a width
- a height
- a dictionary of anchors in the local coordinate system (see below)
- a function that returns anchors in the parent coordinate system.
- tags (set of strings)
- a draw function that takes **only** a canvas argument.

Anchors
-------

Figure elements provide natural attachment points called anchors that can be used for composing figures from multiple elements.

The anchors are stored with respect to the local coordinate system.

Anchors usually have a string name.

A function provides access to the anchors in the parent's coordinate system.


Groups of Elements
------------------

A group of elements can be combined into a single element.

All the elements in the group have the group itself as a parent.

Boxes
-----

Putting a box around something is quite natural.
Boxes have both padding and margin.
Sometimes the boxes have width or height that is determined based on something in its parent element.
For example, in a vertical list, the width of the boxes, depends on the max width of any box in the list.

The Figure
----------

The figure is a tree of elements.
The root is a group.
There is a total order on the primitive elements so they can be drawn consistently.

The canvas orders Elements lexicographically by:
- The z-order of their style.
- The creation order.

Elements will often be placed with respect to each others' anchors.

Models for Data Structure Visualization
---------------------------------------

To visualize a data structure, one implements a class that extends `ds2viz.Element` or `ds2viz.Group`.
Ideally, the initializer takes a single instance of the class to be visualized and optionally, a style and stylesheet.

The initializer might wrap the data structure in a separately tested wrapper that exposes some of the private attributes of the class.

Styles
------

Styles are lists of dictionaries.

The standard way to describe styles is in YAML.

An object with a particular style will (usually) generate one primitive per style.

Styles properties can be split into drawing properties and layout properties.

Drawing properties are those that will be assigned to the drawing primitive and can be passed (more or less) directly to the drawing engine.

Layout properties will affect how the primitives are defined.  These could include the radius of a point, the padding around a box, the z order, etc.

Image Engines
-------------

An `ImageEngine` provides a thin wrapper for translating primitives into whatever form is needed to produce an image file.
It also translates the comparable drawing styles.

Vocabulary for Styles
---------------------

Whenever possible, I want to opt for the web standard vocabulary for style principles.
This means, in particular, using `'font_family'` instead of `'fontfamily'`.
Ideally, a style would look a lot like CSS.
