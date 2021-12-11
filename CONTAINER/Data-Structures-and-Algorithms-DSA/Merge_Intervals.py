"""Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, 
and return an array of the non-overlapping intervals that cover all the intervals in the input.

 
Example:
intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6]
"""

#This is a python code
 def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        start = []
        end = []
        
        for i in intervals:
            start.append(i[0])
            end.append(i[1])
            
        start = sorted(start)
        end = sorted(end)
            
        result = []
        
        t = [start[0], end[0]]
        for i in range(len(start)):
            if t[1] >= start[i]:
                t[1] = max(t[1], end[i])
            else:
                result.append(t)                
                t = [start[i], end[i]]
                
        result.append(t)
        
        return result
  
