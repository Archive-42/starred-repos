#

#

#
"""Extension to allow references to Python documentation.

Use the ``:pydoc:`` role in-line, specifying the name of the
module to link to.

For example::

    :pydoc:`xml.etree.ElementTree`

"""

import sys

from docutils import nodes, utils
from docutils.parsers.rst.roles import set_classes

from sphinx.util import logging

LOG = logging.getLogger(__name__)

PYTHON_VERSION = "{}.{}".format(*(sys.version_info[:2]))
URL_TEMPLATE = "https://docs.python.org/" + PYTHON_VERSION + "/library/{}.html"
TITLE_TEMPLATE = "Standard library documentation for {}"


def make_link_node(rawtext, app, module_name, options):
    """Create a link.

    :param rawtext: Text being replaced with link node.
    :param app: Sphinx application context
    :param module_name: The real name of the module
    :param options: Options dictionary passed to role func
    """
    set_classes(options)
    node = nodes.reference(
        rawtext,
        TITLE_TEMPLATE.format(module_name),
        refuri=URL_TEMPLATE.format(module_name.lower()),
        **options
    )
    return node


def pydoc_role(name, rawtext, text, lineno, inliner, options={}, content=[]):
    """Link to a Python module documentation page.

    Returns 2 part tuple containing list of nodes to insert into
    the document and a list of system messages.  Both are allowed
    to be empty.

    :param name: The role name used in the document.
    :param rawtext: The entire markup snippet, with role.
    :param text: The text marked with the role.
    :param lineno: The line number where rawtext appears in the
                   input.
    :param inliner: The inliner instance that called us.
    :param options: Directive options for customization.
    :param content: The directive content for customization.
    """
    module_name = text.strip()
    if not module_name:
        msg = inliner.reporter.error(
            "Module name must not be empty; " "%r is invalid." % text, line=lineno
        )
        prb = inliner.problematic(rawtext, rawtext, msg)
        return [prb], [msg]
    app = inliner.document.settings.env.app
    # LOG.info('stdlib module link {!r}\n'.format(text))
    node = make_link_node(rawtext, app, module_name, options)
    return [node], []


def setup(app):
    """Install the plugin.

    :param app: Sphinx application context.
    """
    LOG.info("Initializing BitBucket plugin")
    app.add_role("pydoc", pydoc_role)
