Exception Handling {#sys-exceptions}
==================

`sys` includes features for trapping and working with exceptions.

Unhandled Exceptions {#sys-unhandled-exceptions}
--------------------

Many applications are structured with a main loop that wraps execution
in a global exception handler to trap errors not handled at a lower
level. Another way to achieve the same thing is by setting the
`sys.excepthook` to a function that takes three arguments (the error
type, error value, and traceback) and let it deal with unhandled errors.

::: {.literalinclude caption="" start-after="#end_pymotw_header"}
sys\_excepthook.py
:::

Since there is no `try:except` block around the line where the exception
is raised the following call to `print()` is not run, even though the
except hook is set.

``` {.sourceCode .none}
$ python3 sys_excepthook.py

Before exception
Unhandled error: <class 'RuntimeError'> This is the error
message
```

Current Exception
-----------------

There are times when an explicit exception handler is preferred, either
for code clarity or to avoid conflicts with libraries that try to
install their own `excepthook`. In these cases, a common handler
function can be created that does not need to have the exception object
passed to it explicitly by calling `exc_info()` to retrieve the current
exception for a thread.

The return value of `exc_info()` is a three member tuple containing the
exception class, an exception instance, and a traceback. Using
`exc_info()` is preferred over the old form (with `exc_type`,
`exc_value`, and `exc_traceback`) because it is thread-safe.

::: {.literalinclude caption="" start-after="#end_pymotw_header"}
sys\_exc\_info.py
:::

This example avoids introducing a circular reference between the
traceback object and a local variable in the current frame by ignoring
that part of the return value from `exc_info()`. If the traceback is
needed (for example, so it can be logged), explicitly delete the local
variable (using `del`) to avoid cycles.

``` {.sourceCode .none}
$ python3 sys_exc_info.py

Handling RuntimeError exception with message "This is the error
message" in Thread-2
Handling RuntimeError exception with message "This is the error
message" in Thread-1
```

Previous Interactive Exception
------------------------------

In the interactive interpreter, there is only one thread of interaction.
Unhandled exceptions in that thread are saved to three variables in
`sys` (`last_type`, `last_value`, and `last_traceback`) to make it easy
to retrieve them for debugging. Using the postmortem debugger in
`pdb`{.interpreted-text role="mod"} avoids any need to use the values
directly.

``` {.sourceCode .none}
$ python3
Python 3.4.2 (v3.4.2:ab2c023a9432, Oct  5 2014, 20:42:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> def cause_exception():
...     raise RuntimeError('This is the error message')
...
>>> cause_exception()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 2, in cause_exception
RuntimeError: This is the error message
>>> import pdb
>>> pdb.pm()
> <stdin>(2)cause_exception()
(Pdb) where
  <stdin>(1)<module>()
> <stdin>(2)cause_exception()
(Pdb)
```

::: {.seealso}
-   `exceptions`{.interpreted-text role="mod"} \-- Built-in errors
-   `pdb`{.interpreted-text role="mod"} \-- Python debugger
-   `traceback`{.interpreted-text role="mod"} \-- Module for working
    with tracebacks
:::
