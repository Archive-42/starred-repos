/*Given an array of integers where each element represents the max number of steps that can be made forward from that element. 
Find the minimum number of jumps to reach the end of the array (starting from the first element). 
If an element is 0, then you cannot move through that element.

Example:
N=11 
arr=1 3 5 8 9 2 6 7 6 8 9 
Output: 3 
Explanation: 
First jump from 1st element to 2nd 
element with value 3. Now, from here 
we jump to 5th element with value 9, 
and from here we will jump to last.

Example 
N=6
arr=1 0 3 2 6 7
Output: 3 
Explanation: 
First jump from 1st element to 2nd 
element with value 3. Now, from here 
we jump to 5th element with value 9, 
and from here we will jump to last.
*/

//Code
int minJumps(int arr[], int n){
	if(n<=1)
    	return 0;
	if(arr[0]==0)
    	return -1;
	int jumps = 1;
	int reachable = 0;
	int current = arr[0];
	for(int i=1;i<n;i++)
	{
    	reachable = max(reachable, i+arr[i]);
    	if(current==i && i!=n-1)
    	{
        	jumps++;
        	current = reachable;
        	reachable = -1;
    	}
    	if(current==i && i!=n-1)
        	return -1;	
	}	
	return jumps;
}
