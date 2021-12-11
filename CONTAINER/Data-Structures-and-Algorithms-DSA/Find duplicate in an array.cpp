/*Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.
Input:
a[] = [1,3,4,2,2]
Output : 2
*/

int main()
{
   int a[]={1,9,3,4,9,6};
   int duplicate,count=0;
   int size=(sizeof(a)/sizeof(*a));
   if(size==0 || size==1)
    cout<<"No element for Comparision";
   for(int i=0;i<size;i++)
    {
        count=0;
        for(int j=i;j<size;j++)
        {
            if(a[i]==a[j])
            {
                duplicate=a[j];
                count++;
            }
        }
        if(count==2)
            cout<<duplicate;
     }
return 0;
}

