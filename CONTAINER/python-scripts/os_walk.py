#!/usr/bin/env python

import os
path = "/home/kaizu/scripts/python"

def enumeratepaths(path=path):
	"""return pathes to all files in catalogue in a form of list"""
	path_collection = []
	for dirpath, dirnames, filenames in os.walk(path):
		for file in filenames:
			fullpath = os.path.join(dirpath, file)
			path_collection.append(fullpath)

	return path_collection

def enumeratefiles(path=path):
	"""return names of all files in catalogue"""
	file_collection = []
	for dirpath, dirnames, filenames in os.walk(path):
		for file in filenames:
			file_collection.append(file)

	return file_collection

def enumeratedir(path=path):
	"""return names of subdirectories"""
	dir_collection = []
	for dirpath, dirnames, filenames in os.walk(path):
		for dir in dirnames:
			dir_collection.append(dir)

	return dir_collection

if __name__ == "__main__":
	print "\nRecursive listing of all paths in a dir:"
	for path in enumeratepaths():
		print path

	print "\nRecursive listing of all files in dir:"
	for file in enumeratefiles():
		print path

	print "\nRecursive listing of all dirs in dir:"
	for dir in enumeratedir():
		print dir
