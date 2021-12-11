#!/usr/bin/env python

import sys
import httplib
from optparse import OptionParser

def check_webserver(address, port, resource):
	# create request HTTP
	if not resource.startswith('/'):
		resource = '/' + resource

	try:
		conn = httplib.HTTPConnection(address, port)
		print "HTTP connection created successfully"
		# request
		req = conn.request('GET', resource)
		print "request for %s successful" % resource
		# response
		response = conn.getresponse()
		print "response status: %s" % response.status
	except socket.error, e:
		print "HTTP connection failed: %s" % e
		return False
	finally:
		conn.close()
		print "HTTP connection closed successfully"

	if response.status in [200, 301]:
		return True
	else:
		return False

if __name__ == '__main__':
	parser = OptionParser()
	parser.add_option("-a", "--address", dest="address", default="localhost", help="ADDRESS for server", metavar="ADDRESS")
	parser.add_option("-p", "--port", dest="port", type="int", default=80, help="PORT for server", metavar="PORT")
	parser.add_option("-r", "--resource", dest="resource", default="index.html", help="RESOURCE to check", metavar="RESOURCE")

	(options, args) = parser.parse_args()
	print "options: %s, args: %s" % (options, args)
	check = check_webserver(options.address, options.port, options.resource)
	print "check_webserver returned %s" % check
	sys.exit(not check)