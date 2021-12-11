/* Rearrange positive and negative numbers in an array

Example
Input:
s = 1 -1 2 2 3 -3
Output: -1 -2 -3 1 3 2
*/

//using partition process
void rearrange(int arr[], int n)
{
  int j=0;
	for(int i = 0; i < n; i++)
    {
        if (arr[i] < 0) 
          {
            if (i != j)
              swap(arr[i],arr[j]);
            j++;
          }
    }
}
