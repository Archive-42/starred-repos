#!/usr/bin/env python

from threading import Thread
import subprocess
from Queue import Queue

num_threads = 3
queue = Queue()
ips = ["8.8.8.8", "216.58.209.174", "72.163.4.161"]
def pinger(i, q):
	"""request for net"""
	while True:
		ip = q.get()
		print "\nThread %s: Pinging %s\n" % (i, ip)
		ret = subprocess.call("ping -c 1 %s" % ip, shell=True, stdout=open('/dev/null', 'w'), stderr=subprocess.STDOUT)

		if ret == 0:
			print "%s: is alive" % ip
		else:
			print "%s: did not respond" % ip

		q.task_done()

for i in range(num_threads):
	worker = Thread(target=pinger, args=(i, queue))
	worker.setDaemon(True)
	worker.start()

for ip in ips:
	queue.put(ip)

print "Main Thread waiting...\n"
queue.join()
print "Done"