/* The distance of a pair of integers a and b is defined as the absolute difference between a and b.

Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.

Input: nums = [1,3,1], k = 1
Output: 0
Explanation: Here are all the pairs:
(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.
*/

#define ll long long int
class Solution {
public:
    int check(vector<int>& a,int x,int k){
        int cnt=0,n=a.size(),ind=0;
        for(int i=1;i<n;i++){
            while(ind<i&&(a[i]-a[ind]>x))
                ind++;
            cnt+=(i-ind);
        }
        if(cnt>=k)
            return -1;
        return 1;
    }
    int smallestDistancePair(vector<int>& a, int k) {
        sort(a.begin(),a.end());
        int n=a.size();
        int l=0,h=a[n-1]-a[0];
        while(l<h){
            int mid=l+(h-l)/2;
            int flag=check(a,mid,k);
            if(flag==-1)
                h=mid;
            else
                l=mid+1;
        }
        return l;
    }
};
