/*Given an array, rotate the array by one position in clock-wise direction.

Example:
Input:
N = 5
A[] = {1, 2, 3, 4, 5}
Output:
5 1 2 3 4
*/

//Method 1- By Forword traversal of arrya
void rotate(int arr[], int n) // arr[] is varibale containing array and n is the size of array  
{
    int i,temp;
    int last = arr[n-1];
    for(i=1;i<n;i++)
    {
        if(i==1){
        temp=arr[i];
        arr[i]=arr[0];
        arr[0]=last;
     }
     else
        swap(temp,arr[i]);  //This can be done using swaping operation using variable
  }
     
 //Method 2- By backword traversal of arrya
 void rotate(int arr[], int n)
{
    int i,temp;
    int last = arr[n-1];
    for(i=n;i>0;i--)
    {
        arr[i]=arr[i-1];
        
    }
    arr[0]=last;
}
