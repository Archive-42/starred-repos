#!/usr/bin/env python

# log parsing
# for MacPaw Internship 2016
# made by Vladyslav Voloshyn
# sorry for making it in Python =)

from collections import Counter
from sets import Set

theFile = open('/var/log/apache2/access.log','r')
FILE = theFile.readlines()
theFile.close()

def response_code():
	"""response codes"""
	print "function for response codes\n"
	array = []
	for line in FILE:
		find = line.index('"')
		line = line[find+1:]
		find2 = line.index('"')
		line = line[find2+2:find2+5]
		array.append(line)		
	

	unique = set(array)
	lst = Counter()
	for value in unique:
		for line in FILE:
			if value in line:
				lst[value] += 1
	
	for value in unique:
		print value,  ": responses for response code", lst[value]
	
	print "---------------------------------------------------"
						

def client_requests():
	"""print unique visitors"""
	print "function for unique users\n"
	visitors = {}
	for line in FILE:
		slice = line.index('[')
		line = line[:slice-1]
		ip = line.split(" - ")[1] # assuming it must have " - " in line
		visitors[ip] = line
	
	count = Counter()
	for visitor in visitors:
		for line in FILE:
			if (visitor in line):
				count[visitor] += 1
	
	for visitor in visitors:
		print visitors[visitor],  ": User number of requests: ", count[visitor]


if __name__ == "__main__":
	response_code()
	print "\n"
	client_requests()
