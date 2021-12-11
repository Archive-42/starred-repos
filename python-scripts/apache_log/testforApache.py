#!/usr/bin/env python
# unittesting for parserforApache.py

import unittest
import parserforApache

class TestApacheLogParser(unittest.TestCase):
	def setUp(self):
		pass

	def testCombinedExample(self):
		# combined example
		combined_log_entry = '64.242.88.10 - - [07/Mar/2004:16:05:49 -0800] "GET /twiki/bin/edit/Main/Double_bounce_sender?topicparent=Main.ConfigurationVariables HTTP/1.1" 401 12846 "http://www.example.com/start.html" "Mozilla/4.08 [en] (Win98; I; Nav)"'
		self.assertEqual(parserforApache.dictify_logline(combined_log_entry),
			{'remote_host': '64.242.88.10', 'status': '401', 'bytes_sent': '12846'})

	def testCommonExample(self):
		# common example
		common_log_entry = '127.0.0.1 - - [07/Mar/2004:16:05:49 -0800] "GET /twiki/bin/edit/Main/Double_bounce_sender?topicparent=Main.ConfigurationVariables HTTP/1.1" 200 2326'
		self.assertEqual(parserforApache.dictify_logline(common_log_entry),
			{'remote_host': '127.0.0.1', 'status': '200', 'bytes_sent': '2326'})

	def testExtraWhitespace(self):
		# test in case with extra spaces
		common_log_entry = '127.0.0.1      -         - [07/Mar/2004:16:05:49 -0800] "GET /twiki/bin/edit/Main/Double_bounce_sender?topicparent=Main.ConfigurationVariables HTTP/1.1" 200 2326'
		self.assertEqual(parserforApache.dictify_logline(common_log_entry), 
			{'remote_host': '127.0.0.1', 'status': '200', 'bytes_sent': '2326'})

if __name__ == '__main__':
	unittest.main()