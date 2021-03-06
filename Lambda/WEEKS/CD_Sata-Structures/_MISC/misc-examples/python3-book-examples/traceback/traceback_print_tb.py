#
"""
"""

# end_pymotw_header
import traceback
import sys

from traceback_example import produce_exception

try:
    produce_exception()
except Exception as err:
    print("print_tb():")
    exc_type, exc_value, exc_tb = sys.exc_info()
    traceback.print_tb(exc_tb)
