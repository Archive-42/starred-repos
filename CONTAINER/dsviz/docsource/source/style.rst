Styles
======

Styles are defined on `Element`s.
The `Canvas` just passes along the style to the engine (unchanged), however for compound styles (lists) the canvas will only get one at a time.
The `Canvas` will add default styles if none are provided.
The `Engine` is responsible for pruning unnecessary styles and translating names and types into a usable format.

Styles are usually specified in a YAML file.
They are named dictionaries, or lists of dictionaries.
