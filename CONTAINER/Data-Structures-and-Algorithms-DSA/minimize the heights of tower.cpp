/*Given an array arr[] denoting heights of N towers and a positive integer K, you have to modify 
the height of each tower either by increasing or decreasing them by K only once. 
After modifying, height should be a non-negative integer. 
Find out what could be the possible minimum difference of the height of shortest and longest towers after you have modified each tower.

Example:
Input:
K = 2, N = 4
Arr[] = {1, 5, 8, 10}
Output:
5
Explanation:
The array can be modified as 
{3, 3, 6, 8}. The difference between 
the largest and the smallest is 8-3 = 5.
*/

int getMinDiff(int arr[], int n, int k) {
        // code here
        if (n==1)
            return 0;
        sort(arr, arr+n);
        int diff = arr[n-1]-arr[0]; 
        
        int minimum = arr[0]+k;
        int maximum = arr[n-1]-k;
        int temp=0;
        
        if(minimum > maximum)
        {
            temp=minimum;
            minimum=maximum;
            maximum=temp;
        }
        
        for(int i=1;i<n-1;i++)
        {
            if (arr[i]-k>=minimum || arr[i]+k<=maximum)
                continue;
            if(maximum-(arr[i]-k) <= (arr[i]+k) - minimum)
                minimum=arr[i]-k;
            else
                maximum=arr[i]+k;
        }
        int min_diff=min(diff, maximum-minimum);
        return min_diff;
        
    }
