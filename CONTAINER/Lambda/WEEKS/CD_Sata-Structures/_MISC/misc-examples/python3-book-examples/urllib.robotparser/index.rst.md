urllib.robotparser \-\-- Internet Spider Access Control
=======================================================

::: {.module synopsis="Internet spider access control"}
urllib.robotparser
:::

Purpose

:   Parse `robots.txt` file used to control Internet spiders

`robotparser`{.interpreted-text role="mod"} implements a parser for the
`robots.txt` file format, including a function that checks if a given
user agent can access a resource. It is intended for use in well-behaved
spiders, or other crawler applications that need to either be throttled
or otherwise restricted.

robots.txt
----------

The `robots.txt` file format is a simple text-based access control
system for computer programs that automatically access web resources
(\"spiders\", \"crawlers\", etc.). The file is made up of records that
specify the user agent identifier for the program followed by a list of
URLs (or URL prefixes) the agent may not access.

This is the `robots.txt` file for `https://pymotw.com/`:

::: {.literalinclude caption=""}
robots.txt
:::

It prevents access to some of the parts of the site that are expensive
to compute and would overload the server if a search engine tried to
index them. For a more complete set of examples of `robots.txt`, refer
to [The Web Robots Page](http://www.robotstxt.org/orig.html).

Testing Access Permissions
--------------------------

Using the data presented earlier, a simple crawler can test whether it
is allowed to download a page using `RobotFileParser.can_fetch()`.

::: {.literalinclude caption="" start-after="#end_pymotw_header"}
urllib\_robotparser\_simple.py
:::

The URL argument to `can_fetch()` can be a path relative to the root of
the site, or full URL.

``` {.sourceCode .none}
$ python3 urllib_robotparser_simple.py

  True : /
  True : https://pymotw.com/

  True : /PyMOTW/
  True : https://pymotw.com/PyMOTW/

 False : /admin/
 False : https://pymotw.com/admin/

 False : /downloads/PyMOTW-1.92.tar.gz
 False : https://pymotw.com/downloads/PyMOTW-1.92.tar.gz
```

Long-lived Spiders
------------------

An application that takes a long time to process the resources it
downloads or that is throttled to pause between downloads should check
for new `robots.txt` files periodically based on the age of the content
it has downloaded already. The age is not managed automatically, but
there are convenience methods to make tracking it easier.

::: {.literalinclude caption="" start-after="#end_pymotw_header"}
urllib\_robotparser\_longlived.py
:::

This extreme example downloads a new `robots.txt` file if the one it has
is more than one second old.

``` {.sourceCode .none}
$ python3 urllib_robotparser_longlived.py

age: 0 
  True : /

age: 1 
  True : /PyMOTW/

age: 2 rereading robots.txt
 False : /admin/

age: 1 
 False : /downloads/PyMOTW-1.92.tar.gz
```

A nicer version of the long-lived application might request the
modification time for the file before downloading the entire thing. On
the other hand, `robots.txt` files are usually fairly small, so it is
not that much more expensive to just retrieve the entire document again.

::: {.seealso}
-   `urllib.robotparser`{.interpreted-text role="pydoc"}
-   [The Web Robots Page](http://www.robotstxt.org/orig.html) \--
    Description of `robots.txt` format.
:::
