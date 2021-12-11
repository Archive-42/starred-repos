/*Given two sorted arrays arr1[] of size N and arr2[] of size M. Each array is sorted in non-decreasing order. 
Merge the two arrays into one sorted array in non-decreasing order without using any extra space.
The task is to find the Kth smallest element in the given array. It is given that all array elements are distinct.
Example:
Input:
N = 4, M = 5
arr1[] = {1, 3, 5, 7}
arr2[] = {0, 2, 6, 8, 9}
Output: 0 1 2 3 5 6 7 8 9
Explanation: Since you can't use any 
extra space, modify the given arrays
to form 
arr1[] = {0, 1, 2, 3}
arr2[] = {5, 6, 7, 8, 9}
*/

void merge(int arr1[], int arr2[], int n1, int n2) {
	   
	int x=n1+n2;
    int final[x] = {0};
    int i = 0, j = 0, k = 0, z = 0;
    while (i < n1 && j < n2)
    {
        if (arr1[i] < arr2[j])
        {
            final[k] = arr1[i];
            i++;
        }
        else
        {
            final[k] = arr2[j];
            j++;
        }
        k++;
    }

    while (i < n1)
    {
        final[k] = arr1[i];
        i++;
        k++;
    }

    while (j < n2)
    {
        final[k] = arr2[j];
        j++;
        k++;
    }
    for(int i=0;i<n1;i++)
    {
        arr1[i]=final[i];
    }
    for(int i=n1;i<x;i++)
    { 
        arr2[z]=final[i];
        ++z;
    }
}
