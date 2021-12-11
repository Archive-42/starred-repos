# Planning for ds2viz

## Public Launch

- [x] styles moved to yaml format
- [x] Get dependencies into `setup.py`
- [x] Setup Basic Sphinx Documentation
- [ ] push to github
- [ ] make docs visible and change url in setup.py
- [ ] put it on pypi
- [ ] do a build test for ds book in fresh pipenv
- [ ] update note in users guide to the data structures book

## Push more style info into the elements

Currently, some elements take an optional parameter for the style.
They should also, optionally take a stylesheet.

- [ ] Add this feature to Element and fix what breaks.

Might also want to add kwargs to overwrite specific styles on the fly.


## Style Merge should be more pythonic

Use the more pythonic method of dictionary merging to merge styles.


## Styles should cascade in a reasonable, logical way

When defining styles, it often makes sense to start from a base style and then extend or modify it.
This is also true for multi-styles (i.e. lists of styles).
Numerical styles should support a `d_` version that indicates the change from the inherited style.  For example `d_radius` would give the change in the radius.

## Dynamic Connectivity and Dependencies

It might make sense to make some connections dependent.
This would really just mean that we keep anchor info rather than vector info in the Element.


## Colors Need a consistent format

Sticking with webstandard hex is probably best.
Not sure about opacity?

## Deal properly with margin and padding

Add a method called `boxalignLR(self, other)`.
It handles alignment of `self.left` with respect to `other.right` taking into account the padding on both.

These are defined in the style.
It should be possible to pad and margin the sides differently as in html.

We need to decide how margins and padding work for alignment.
Traditionally, padding is a minimum guarantee that is not additive.
Adjacent elements are spaced so the distance is the max of their padding values.

## Arrowheads and curve decorations

## Anchors as a function

Especially needed for groups and circles.
For groups, an index should give you access to the anchors of the children.
For circles (and points), a vector should give you an anchor on the boundary.

This might even do better with a different name, like **target**.
A target for a given name returns a point.
